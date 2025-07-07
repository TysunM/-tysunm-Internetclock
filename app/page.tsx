"use client"

import React, { useState, useEffect, lazy, Suspense, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'

// Lazy load heavy components
const ClockComponent = lazy(() => import('@/components/ClockComponent'))
const WeatherComponent = lazy(() => import('@/components/WeatherComponent'))

// Dynamic imports with SSR disabled for client-side only components
const InterstitialAd = dynamic(() => import('@/components/InterstitialAd'), { 
  ssr: false,
  loading: () => <div className="ad-loading">Loading...</div>
})

const BannerAd = dynamic(() => import('@/components/BannerAd'), { 
  ssr: false,
  loading: () => <div className="banner-placeholder">Ad</div>
})

const RewardedVideoAd = dynamic(() => import('@/components/RewardedVideoAd'), { 
  ssr: false 
})

// Loading component for Suspense
const ComponentLoader = () => (
  <div className="component-loading">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
)

export default function HomePage() {
  const [currentView, setCurrentView] = useState('clock')
  const [clickCount, setClickCount] = useState(0)
  const [showInterstitial, setShowInterstitial] = useState(false)
  const [theme, setTheme] = useState('cosmic')
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null)
  const [locationLoaded, setLocationLoaded] = useState(false)

  // Optimized ad configuration - memoized to prevent re-renders
  const adConfig = useMemo(() => ({
    interstitialFrequency: 7,
    bannerRefreshRate: 30000,
    rewardedVideoAvailable: true
  }), [])

  // Optimized click handler with useCallback
  const handleUserClick = useCallback(() => {
    setClickCount(prev => {
      const newCount = prev + 1
      if (newCount % adConfig.interstitialFrequency === 0) {
        setShowInterstitial(true)
      }
      return newCount
    })
  }, [adConfig.interstitialFrequency])

  // Optimized geolocation with better error handling
  useEffect(() => {
    if (!locationLoaded && 'geolocation' in navigator) {
      const options = {
        enableHighAccuracy: false, // Faster, less battery usage
        timeout: 5000,
        maximumAge: 300000 // Cache for 5 minutes
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
          setLocationLoaded(true)
        },
        () => {
          // Fallback to NYC coordinates
          setUserLocation({ lat: 40.7128, lon: -74.0060 })
          setLocationLoaded(true)
        },
        options
      )
    }
  }, [locationLoaded])

  // Memoized view configuration
  const views = useMemo(() => [
    { id: 'clock', name: '🕐 Clock', component: 'ClockComponent' },
    { id: 'weather', name: '🌤️ Weather', component: 'WeatherComponent' },
    { id: 'timer', name: '⏲️ Timer', component: 'ClockComponent' },
    { id: 'stopwatch', name: '⏱️ Stopwatch', component: 'ClockComponent' },
    { id: 'worldclock', name: '🌍 World', component: 'ClockComponent' },
    { id: 'focus', name: '🎯 Focus', component: 'ClockComponent' }
  ], [])

  // Optimized component renderer with memoization
  const getCurrentComponent = useMemo(() => {
    const view = views.find(v => v.id === currentView)
    if (!view) return null
    
    if (currentView === 'weather') {
      return (
        <Suspense fallback={<ComponentLoader />}>
          <WeatherComponent userLocation={userLocation} theme={theme} />
        </Suspense>
      )
    } else {
      return (
        <Suspense fallback={<ComponentLoader />}>
          <ClockComponent 
            theme={theme} 
            setTheme={setTheme} 
            mode={currentView}
            onUserClick={handleUserClick}
          />
        </Suspense>
      )
    }
  }, [currentView, userLocation, theme, handleUserClick, views])

  // Memoized navigation handler
  const handleViewChange = useCallback((viewId: string) => {
    setCurrentView(viewId)
    handleUserClick()
  }, [handleUserClick])

  return (
    <div className={`app ${theme}`}>
      {/* Navigation */}
      <nav className="nav-container" role="navigation" aria-label="Main navigation">
        {views.map(view => (
          <button
            key={view.id}
            className={`nav-btn ${currentView === view.id ? 'active' : ''}`}
            onClick={() => handleViewChange(view.id)}
            aria-pressed={currentView === view.id}
          >
            {view.name}
          </button>
        ))}
      </nav>

      {/* Side Ads - Only load when needed */}
      {clickCount > 2 && (
        <aside className="side-ads" aria-label="Advertisements">
          <BannerAd 
            position="left" 
            size="160x600"
            refreshRate={adConfig.bannerRefreshRate}
          />
          <BannerAd 
            position="right" 
            size="160x600"
            refreshRate={adConfig.bannerRefreshRate}
          />
        </aside>
      )}

      {/* Main Content */}
      <main className="main-content" role="main">
        {getCurrentComponent}
      </main>

      {/* Bottom Banner Ad - Lazy loaded */}
      {clickCount > 1 && (
        <BannerAd 
          position="bottom" 
          size="728x90"
          refreshRate={adConfig.bannerRefreshRate}
        />
      )}

      {/* Interstitial Ad - Only when needed */}
      {showInterstitial && (
        <InterstitialAd 
          onClose={() => setShowInterstitial(false)}
          onUserClick={handleUserClick}
        />
      )}

      {/* Rewarded Video Ad - Very lazy loaded */}
      {adConfig.rewardedVideoAvailable && clickCount > 5 && (
        <RewardedVideoAd 
          onRewardEarned={() => console.log('Reward earned!')}
          onUserClick={handleUserClick}
        />
      )}
    </div>
  )
}