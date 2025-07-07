import React, { useState, useEffect } from 'react';
import './BannerAd.css';

const BannerAd = ({ position, size, refreshRate = 30000 }) => {
  const [currentAd, setCurrentAd] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Different banner ad content
  const bannerAds = [
    {
      id: 1,
      title: 'Weather Pro',
      subtitle: 'Advanced Forecasts',
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      cta: 'Upgrade',
      icon: '🌟'
    },
    {
      id: 2,
      title: 'Food Delivery',
      subtitle: 'Order Now - 20% Off',
      background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
      textColor: '#ffffff',
      cta: 'Order',
      icon: '🍕'
    },
    {
      id: 3,
      title: 'Fitness App',
      subtitle: 'Track Your Health',
      background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
      textColor: '#ffffff',
      cta: 'Download',
      icon: '💪'
    },
    {
      id: 4,
      title: 'Shopping Sale',
      subtitle: 'Up to 50% Off',
      background: 'linear-gradient(90deg, #fa709a 0%, #fee140 100%)',
      textColor: '#ffffff',
      cta: 'Shop',
      icon: '🛍️'
    },
    {
      id: 5,
      title: 'Game Zone',
      subtitle: 'Play & Win Prizes',
      background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
      textColor: '#ffffff',
      cta: 'Play',
      icon: '🎮'
    },
    {
      id: 6,
      title: 'Travel Deals',
      subtitle: 'Book Your Trip',
      background: 'linear-gradient(90deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#333333',
      cta: 'Book',
      icon: '✈️'
    }
  ];

  // Auto-refresh ads
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd(prev => (prev + 1) % bannerAds.length);
    }, refreshRate);

    return () => clearInterval(interval);
  }, [refreshRate, bannerAds.length]);

  const handleAdClick = () => {
    const ad = bannerAds[currentAd];
    console.log(`Banner ad clicked: ${ad.title} - Position: ${position}`);
    // In real app, this would open the advertiser's link
    alert(`Opening: ${ad.title}`);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Re-show after 10 seconds
    setTimeout(() => setIsVisible(true), 10000);
  };

  if (!isVisible) {
    return <div className={`banner-ad-placeholder ${position}`}></div>;
  }

  const ad = bannerAds[currentAd];
  const [width, height] = size.split('x');

  return (
    <div 
      className={`banner-ad ${position}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: ad.background,
        color: ad.textColor
      }}
      onClick={handleAdClick}
    >
      {/* Close button for user control */}
      <button 
        className="banner-close"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        ✕
      </button>

      {/* Ad content based on size */}
      {size === '320x50' && (
        <div className="banner-content-small">
          <span className="banner-icon">{ad.icon}</span>
          <div className="banner-text">
            <span className="banner-title">{ad.title}</span>
            <span className="banner-subtitle">{ad.subtitle}</span>
          </div>
          <button className="banner-cta">{ad.cta}</button>
        </div>
      )}

      {size === '728x90' && (
        <div className="banner-content-large">
          <span className="banner-icon-large">{ad.icon}</span>
          <div className="banner-text-large">
            <h3 className="banner-title-large">{ad.title}</h3>
            <p className="banner-subtitle-large">{ad.subtitle}</p>
          </div>
          <button className="banner-cta-large">{ad.cta}</button>
        </div>
      )}

      {size === '120x600' && (
        <div className="banner-content-skyscraper">
          <div className="skyscraper-icon">{ad.icon}</div>
          <div className="skyscraper-text">
            <h4 className="skyscraper-title">{ad.title}</h4>
            <p className="skyscraper-subtitle">{ad.subtitle}</p>
          </div>
          <button className="skyscraper-cta">{ad.cta}</button>
        </div>
      )}

      {size === '300x250' && (
        <div className="banner-content-medium">
          <div className="medium-icon">{ad.icon}</div>
          <h3 className="medium-title">{ad.title}</h3>
          <p className="medium-subtitle">{ad.subtitle}</p>
          <button className="medium-cta">{ad.cta}</button>
        </div>
      )}

      {/* Ad indicator */}
      <div className="ad-indicator">
        <span className="ad-label">Ad</span>
        <div className="ad-dots">
          {bannerAds.map((_, index) => (
            <span 
              key={index}
              className={`dot ${index === currentAd ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerAd;

