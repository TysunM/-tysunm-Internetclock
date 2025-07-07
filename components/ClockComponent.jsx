import React, { useState, useEffect } from 'react';
import './ClockComponent.css';

const ClockComponent = ({ theme, setTheme, mode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Timer functionality
  useEffect(() => {
    let interval;
    if (timerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        } else {
          setTimerRunning(false);
          alert('Timer finished!');
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerMinutes, timerSeconds]);

  // Stopwatch functionality
  useEffect(() => {
    let interval;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prev => prev + 1);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatStopwatch = (centiseconds) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const themes = [
    { id: 'cosmic', name: '🌌 Cosmic', colors: ['#667eea', '#764ba2'] },
    { id: 'neon', name: '💫 Neon', colors: ['#ff006e', '#8338ec'] },
    { id: 'sunset', name: '🌅 Sunset', colors: ['#ff9a9e', '#fecfef'] },
    { id: 'forest', name: '🌲 Forest', colors: ['#134e5e', '#71b280'] },
    { id: 'minimal', name: '⚫ Minimal', colors: ['#2c3e50', '#34495e'] },
    { id: 'matrix', name: '🔋 Matrix', colors: ['#0f3460', '#16213e'] },
    { id: 'cyberpunk', name: '🤖 Cyberpunk', colors: ['#ff006e', '#3a0ca3'] },
    { id: 'aurora', name: '🌈 Aurora', colors: ['#00c9ff', '#92fe9d'] }
  ];

  const worldClocks = [
    { city: 'New York', flag: '🇺🇸', timezone: 'America/New_York' },
    { city: 'London', flag: '🇬🇧', timezone: 'Europe/London' },
    { city: 'Tokyo', flag: '🇯🇵', timezone: 'Asia/Tokyo' },
    { city: 'Sydney', flag: '🇦🇺', timezone: 'Australia/Sydney' }
  ];

  const getWorldTime = (timezone) => {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`clock-component ${theme}`}>
      {/* Clock Mode */}
      {mode === 'clock' && (
        <div className="clock-mode">
          <div className="main-clock">
            <div className="time-display">{formatTime(currentTime)}</div>
            <div className="date-display">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="weather-info">
              <span>☀️ 22°C • Partly Cloudy</span>
            </div>
          </div>
          
          <div className="clock-controls">
            <button 
              className="settings-btn"
              onClick={() => setShowSettings(!showSettings)}
            >
              ⚙️ Settings
            </button>
          </div>

          {showSettings && (
            <div className="settings-panel">
              <h3>⚙️ Settings</h3>
              <div className="theme-section">
                <label>Theme</label>
                <div className="theme-grid">
                  {themes.map(themeOption => (
                    <button
                      key={themeOption.id}
                      className={`theme-btn ${theme === themeOption.id ? 'active' : ''}`}
                      onClick={() => setTheme(themeOption.id)}
                      style={{
                        background: `linear-gradient(135deg, ${themeOption.colors[0]}, ${themeOption.colors[1]})`
                      }}
                    >
                      {themeOption.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Timer Mode */}
      {mode === 'timer' && (
        <div className="timer-mode">
          <div className="timer-display">
            {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
          </div>
          <div className="timer-inputs">
            <div className="input-group">
              <label>Minutes</label>
              <input
                type="number"
                value={timerMinutes}
                onChange={(e) => setTimerMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                min="0"
                max="99"
              />
            </div>
            <div className="input-group">
              <label>Seconds</label>
              <input
                type="number"
                value={timerSeconds}
                onChange={(e) => setTimerSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                min="0"
                max="59"
              />
            </div>
          </div>
          <div className="timer-presets">
            <button onClick={() => { setTimerMinutes(25); setTimerSeconds(0); }}>Pomodoro</button>
            <button onClick={() => { setTimerMinutes(5); setTimerSeconds(0); }}>Short Break</button>
            <button onClick={() => { setTimerMinutes(15); setTimerSeconds(0); }}>Long Break</button>
            <button onClick={() => { setTimerMinutes(60); setTimerSeconds(0); }}>Deep Work</button>
          </div>
          <div className="timer-controls">
            <button 
              className="timer-btn start"
              onClick={() => setTimerRunning(!timerRunning)}
            >
              {timerRunning ? '⏸️ Pause' : '▶️ Start'}
            </button>
            <button 
              className="timer-btn reset"
              onClick={() => {
                setTimerRunning(false);
                setTimerMinutes(25);
                setTimerSeconds(0);
              }}
            >
              🔄 Reset
            </button>
          </div>
        </div>
      )}

      {/* Stopwatch Mode */}
      {mode === 'stopwatch' && (
        <div className="stopwatch-mode">
          <div className="stopwatch-display">
            {formatStopwatch(stopwatchTime)}
          </div>
          <div className="stopwatch-controls">
            <button 
              className="stopwatch-btn start"
              onClick={() => setStopwatchRunning(!stopwatchRunning)}
            >
              {stopwatchRunning ? '⏸️ Pause' : '▶️ Start'}
            </button>
            <button 
              className="stopwatch-btn reset"
              onClick={() => {
                setStopwatchRunning(false);
                setStopwatchTime(0);
              }}
            >
              🔄 Reset
            </button>
          </div>
        </div>
      )}

      {/* World Clock Mode */}
      {mode === 'worldclock' && (
        <div className="worldclock-mode">
          <h3>World Clocks</h3>
          <div className="world-clocks-grid">
            {worldClocks.map((clock, index) => (
              <div key={index} className="world-clock-item">
                <div className="clock-flag">{clock.flag}</div>
                <div className="clock-city">{clock.city}</div>
                <div className="clock-time">{getWorldTime(clock.timezone)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Focus Mode */}
      {mode === 'focus' && (
        <div className="focus-mode">
          <div className="focus-display">
            <h2>🎯 Focus Session</h2>
            <div className="focus-timer">
              {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
            </div>
            <p>Stay focused and productive!</p>
          </div>
          <div className="focus-controls">
            <button 
              className="focus-btn"
              onClick={() => setTimerRunning(!timerRunning)}
            >
              {timerRunning ? '⏸️ Pause Focus' : '▶️ Start Focus'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockComponent;

