import React, { useState } from 'react';
import './RewardedVideoAd.css';

const RewardedVideoAd = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);
  const [rewardEarned, setRewardEarned] = useState(false);
  const [availableRewards, setAvailableRewards] = useState(3);

  const rewards = [
    {
      type: 'premium_features',
      title: 'Premium Features',
      description: 'Unlock advanced weather radar for 24 hours',
      icon: '🌟',
      duration: 30
    },
    {
      type: 'ad_free',
      title: 'Ad-Free Experience',
      description: 'Remove banner ads for 1 hour',
      icon: '🚫',
      duration: 30
    },
    {
      type: 'themes',
      title: 'Exclusive Themes',
      description: 'Unlock 3 premium weather themes',
      icon: '🎨',
      duration: 30
    },
    {
      type: 'widgets',
      title: 'Weather Widgets',
      description: 'Add custom weather widgets',
      icon: '📱',
      duration: 30
    }
  ];

  const [currentReward] = useState(rewards[Math.floor(Math.random() * rewards.length)]);

  const startRewardedVideo = () => {
    setShowVideo(true);
    setWatchProgress(0);
    setRewardEarned(false);

    // Simulate video progress
    const progressInterval = setInterval(() => {
      setWatchProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setRewardEarned(true);
          return 100;
        }
        return prev + (100 / currentReward.duration); // Progress over duration seconds
      });
    }, 1000);
  };

  const claimReward = () => {
    setAvailableRewards(prev => Math.max(0, prev - 1));
    setShowVideo(false);
    setWatchProgress(0);
    setRewardEarned(false);
    
    // Apply the reward
    console.log(`Reward claimed: ${currentReward.title}`);
    alert(`Reward unlocked: ${currentReward.title}!\n${currentReward.description}`);
  };

  const closeVideo = () => {
    setShowVideo(false);
    setWatchProgress(0);
    setRewardEarned(false);
  };

  if (availableRewards === 0) {
    return (
      <div className="rewarded-ad-container">
        <div className="reward-unavailable">
          <span className="reward-icon">⏰</span>
          <p>More rewards available in 2 hours</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rewarded-ad-container">
      {!showVideo ? (
        <div className="reward-offer">
          <div className="reward-header">
            <span className="reward-icon">{currentReward.icon}</span>
            <h3>Earn Reward</h3>
            <span className="rewards-left">{availableRewards} left</span>
          </div>
          <div className="reward-details">
            <h4>{currentReward.title}</h4>
            <p>{currentReward.description}</p>
          </div>
          <button 
            className="watch-video-btn"
            onClick={startRewardedVideo}
          >
            📺 Watch Video ({currentReward.duration}s)
          </button>
        </div>
      ) : (
        <div className="video-overlay">
          <div className="video-container">
            {/* Close button (only after watching 75%) */}
            {watchProgress >= 75 && (
              <button className="video-close" onClick={closeVideo}>
                ✕
              </button>
            )}

            {/* Video placeholder */}
            <div className="video-player">
              <div className="video-content">
                <h2>🎮 Epic Game Adventure</h2>
                <p>Join millions of players in the ultimate strategy game!</p>
                <div className="video-animation">
                  <div className="animated-icon">🏰</div>
                  <div className="animated-text">Build • Battle • Conquer</div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="video-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${watchProgress}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {Math.round(watchProgress)}% • {Math.max(0, currentReward.duration - Math.round(watchProgress * currentReward.duration / 100))}s remaining
              </span>
            </div>

            {/* Reward claim button */}
            {rewardEarned && (
              <div className="reward-claim">
                <div className="reward-earned">
                  <span className="reward-icon-large">{currentReward.icon}</span>
                  <h3>Reward Earned!</h3>
                  <p>{currentReward.description}</p>
                </div>
                <button 
                  className="claim-reward-btn"
                  onClick={claimReward}
                >
                  Claim Reward
                </button>
              </div>
            )}

            {/* Skip countdown */}
            {watchProgress < 75 && (
              <div className="skip-info">
                <p>Skip available in {Math.max(0, Math.round((75 - watchProgress) * currentReward.duration / 100))}s</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardedVideoAd;

