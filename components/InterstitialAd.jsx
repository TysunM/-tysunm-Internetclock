import React, { useState, useEffect } from 'react';
import './InterstitialAd.css';

const InterstitialAd = ({ onClose, clickCount }) => {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const [adContent, setAdContent] = useState(null);

  // Simulate different ad types
  const adTypes = [
    {
      type: 'video',
      title: 'Premium Weather Pro',
      description: 'Get advanced weather features with no ads!',
      cta: 'Upgrade Now',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '🌟'
    },
    {
      type: 'banner',
      title: 'Local Restaurant Deals',
      description: 'Save 20% on your next meal delivery',
      cta: 'Order Now',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '🍕'
    },
    {
      type: 'app',
      title: 'Download Fitness Tracker',
      description: 'Track your workouts and stay healthy',
      cta: 'Install Free',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: '💪'
    },
    {
      type: 'game',
      title: 'Play Puzzle Master',
      description: 'Challenge your brain with fun puzzles',
      cta: 'Play Now',
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: '🧩'
    },
    {
      type: 'shopping',
      title: 'Flash Sale - 50% Off',
      description: 'Limited time offer on electronics',
      cta: 'Shop Now',
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: '🛍️'
    }
  ];

  useEffect(() => {
    // Select random ad content
    const randomAd = adTypes[Math.floor(Math.random() * adTypes.length)];
    setAdContent(randomAd);

    // Countdown timer before close button appears
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanClose(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAdClick = () => {
    // Simulate ad click tracking
    console.log(`Ad clicked: ${adContent?.title} - Click count: ${clickCount}`);
    // In real app, this would open the advertiser's link
    alert(`Opening: ${adContent?.title}`);
  };

  const handleClose = () => {
    if (canClose) {
      onClose();
    }
  };

  if (!adContent) return null;

  return (
    <div className="interstitial-overlay">
      <div className="interstitial-ad" style={{ background: adContent.background }}>
        {/* Close button (only appears after countdown) */}
        <button 
          className={`close-btn ${canClose ? 'visible' : 'hidden'}`}
          onClick={handleClose}
          disabled={!canClose}
        >
          ✕
        </button>

        {/* Countdown timer */}
        {!canClose && (
          <div className="countdown-timer">
            <span>Ad closes in {countdown}s</span>
          </div>
        )}

        {/* Ad Content */}
        <div className="ad-content" onClick={handleAdClick}>
          <div className="ad-icon">{adContent.icon}</div>
          <h2 className="ad-title">{adContent.title}</h2>
          <p className="ad-description">{adContent.description}</p>
          <button className="ad-cta">{adContent.cta}</button>
        </div>

        {/* Ad info */}
        <div className="ad-info">
          <span className="ad-label">Advertisement</span>
          <span className="ad-stats">Click #{clickCount}</span>
        </div>

        {/* Skip option for rewarded ads */}
        {adContent.type === 'video' && (
          <div className="reward-info">
            <p>Watch to unlock premium features!</p>
            <div className="reward-progress">
              <div 
                className="progress-bar" 
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterstitialAd;

