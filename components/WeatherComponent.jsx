import React, { useState, useEffect } from 'react';
import './WeatherComponent.css';

const WeatherComponent = ({ location, theme }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [radarData, setRadarData] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState('current');

  // Simulated weather API calls (replace with real API)
  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      // Simulate comprehensive weather data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentWeather({
        temperature: 22,
        feelsLike: 25,
        humidity: 65,
        pressure: 1013,
        visibility: 10,
        windSpeed: 12,
        windDirection: 'NW',
        windGust: 18,
        dewPoint: 16,
        condition: 'Partly Cloudy',
        icon: '⛅',
        sunrise: '06:30',
        sunset: '19:45',
        moonPhase: 'Waxing Crescent',
        cloudCover: 40,
        precipitation: 0,
        precipitationProbability: 20
      });

      setForecast([
        { day: 'Today', high: 25, low: 18, condition: 'Partly Cloudy', icon: '⛅', precipitation: 20 },
        { day: 'Tomorrow', high: 28, low: 20, condition: 'Sunny', icon: '☀️', precipitation: 5 },
        { day: 'Friday', high: 24, low: 16, condition: 'Rainy', icon: '🌧️', precipitation: 80 },
        { day: 'Saturday', high: 22, low: 14, condition: 'Cloudy', icon: '☁️', precipitation: 30 },
        { day: 'Sunday', high: 26, low: 19, condition: 'Sunny', icon: '☀️', precipitation: 10 },
        { day: 'Monday', high: 23, low: 17, condition: 'Thunderstorms', icon: '⛈️', precipitation: 90 },
        { day: 'Tuesday', high: 21, low: 15, condition: 'Partly Cloudy', icon: '⛅', precipitation: 25 }
      ]);

      setHourlyForecast([
        { time: '12:00', temp: 22, condition: '⛅', precipitation: 20, windSpeed: 12 },
        { time: '13:00', temp: 24, condition: '☀️', precipitation: 10, windSpeed: 14 },
        { time: '14:00', temp: 25, condition: '☀️', precipitation: 5, windSpeed: 16 },
        { time: '15:00', temp: 26, condition: '⛅', precipitation: 15, windSpeed: 18 },
        { time: '16:00', temp: 25, condition: '⛅', precipitation: 25, windSpeed: 15 },
        { time: '17:00', temp: 23, condition: '🌧️', precipitation: 60, windSpeed: 20 },
        { time: '18:00', temp: 21, condition: '🌧️', precipitation: 70, windSpeed: 22 },
        { time: '19:00', temp: 20, condition: '☁️', precipitation: 40, windSpeed: 18 }
      ]);

      setAirQuality({
        aqi: 45,
        quality: 'Good',
        pm25: 12,
        pm10: 18,
        o3: 65,
        no2: 25,
        so2: 8,
        co: 0.5
      });

      setUvIndex({
        current: 6,
        max: 8,
        level: 'High',
        protection: 'Wear sunscreen and protective clothing'
      });

      setWeatherAlerts([
        {
          type: 'Heat Advisory',
          severity: 'Moderate',
          description: 'High temperatures expected this afternoon',
          startTime: '14:00',
          endTime: '18:00'
        }
      ]);

      setRadarData({
        precipitation: 'Light rain approaching from the west',
        intensity: 'Moderate',
        movement: 'Moving northeast at 15 km/h'
      });

    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherBackground = () => {
    if (!currentWeather) return '';
    const condition = currentWeather.condition.toLowerCase();
    if (condition.includes('sunny')) return 'sunny-bg';
    if (condition.includes('rain')) return 'rainy-bg';
    if (condition.includes('cloud')) return 'cloudy-bg';
    if (condition.includes('storm')) return 'stormy-bg';
    return 'default-bg';
  };

  const views = [
    { id: 'current', name: 'Current', icon: '🌡️' },
    { id: 'hourly', name: 'Hourly', icon: '⏰' },
    { id: 'daily', name: '7-Day', icon: '📅' },
    { id: 'radar', name: 'Radar', icon: '🌧️' },
    { id: 'air', name: 'Air Quality', icon: '💨' },
    { id: 'alerts', name: 'Alerts', icon: '⚠️' }
  ];

  if (loading) {
    return (
      <div className="weather-loading">
        <div className="loading-spinner"></div>
        <p>Loading comprehensive weather data...</p>
      </div>
    );
  }

  return (
    <div className={`weather-container ${getWeatherBackground()}`}>
      {/* Weather View Selector */}
      <div className="weather-nav">
        {views.map(view => (
          <button
            key={view.id}
            className={`weather-nav-btn ${selectedView === view.id ? 'active' : ''}`}
            onClick={() => setSelectedView(view.id)}
          >
            <span className="nav-icon">{view.icon}</span>
            <span className="nav-text">{view.name}</span>
          </button>
        ))}
      </div>

      {/* Current Weather */}
      {selectedView === 'current' && currentWeather && (
        <div className="current-weather">
          <div className="main-temp">
            <span className="temperature">{currentWeather.temperature}°</span>
            <span className="condition-icon">{currentWeather.icon}</span>
          </div>
          <div className="condition-text">{currentWeather.condition}</div>
          <div className="feels-like">Feels like {currentWeather.feelsLike}°</div>
          
          <div className="weather-details">
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-icon">💧</span>
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{currentWeather.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💨</span>
                <span className="detail-label">Wind</span>
                <span className="detail-value">{currentWeather.windSpeed} km/h {currentWeather.windDirection}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-icon">🌡️</span>
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{currentWeather.pressure} hPa</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">👁️</span>
                <span className="detail-label">Visibility</span>
                <span className="detail-value">{currentWeather.visibility} km</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-icon">🌅</span>
                <span className="detail-label">Sunrise</span>
                <span className="detail-value">{currentWeather.sunrise}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🌇</span>
                <span className="detail-label">Sunset</span>
                <span className="detail-value">{currentWeather.sunset}</span>
              </div>
            </div>
          </div>

          {/* UV Index */}
          {uvIndex && (
            <div className="uv-index">
              <h3>UV Index</h3>
              <div className="uv-display">
                <span className="uv-value">{uvIndex.current}</span>
                <span className="uv-level">{uvIndex.level}</span>
              </div>
              <p className="uv-advice">{uvIndex.protection}</p>
            </div>
          )}
        </div>
      )}

      {/* Hourly Forecast */}
      {selectedView === 'hourly' && hourlyForecast && (
        <div className="hourly-forecast">
          <h3>24-Hour Forecast</h3>
          <div className="hourly-scroll">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="hourly-item">
                <div className="hour-time">{hour.time}</div>
                <div className="hour-icon">{hour.condition}</div>
                <div className="hour-temp">{hour.temp}°</div>
                <div className="hour-precipitation">💧 {hour.precipitation}%</div>
                <div className="hour-wind">💨 {hour.windSpeed}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7-Day Forecast */}
      {selectedView === 'daily' && forecast && (
        <div className="daily-forecast">
          <h3>7-Day Forecast</h3>
          {forecast.map((day, index) => (
            <div key={index} className="daily-item">
              <div className="day-name">{day.day}</div>
              <div className="day-icon">{day.icon}</div>
              <div className="day-condition">{day.condition}</div>
              <div className="day-temps">
                <span className="high">{day.high}°</span>
                <span className="low">{day.low}°</span>
              </div>
              <div className="day-precipitation">💧 {day.precipitation}%</div>
            </div>
          ))}
        </div>
      )}

      {/* Radar */}
      {selectedView === 'radar' && radarData && (
        <div className="radar-view">
          <h3>Weather Radar</h3>
          <div className="radar-map">
            <div className="radar-placeholder">
              <span className="radar-icon">🌧️</span>
              <p>Interactive Radar Map</p>
              <p className="radar-info">{radarData.precipitation}</p>
              <p className="radar-movement">{radarData.movement}</p>
            </div>
          </div>
          <div className="radar-controls">
            <button className="radar-btn">Play Animation</button>
            <button className="radar-btn">Satellite View</button>
            <button className="radar-btn">Temperature</button>
          </div>
        </div>
      )}

      {/* Air Quality */}
      {selectedView === 'air' && airQuality && (
        <div className="air-quality">
          <h3>Air Quality Index</h3>
          <div className="aqi-display">
            <div className="aqi-value">{airQuality.aqi}</div>
            <div className="aqi-quality">{airQuality.quality}</div>
          </div>
          <div className="pollutants">
            <div className="pollutant-item">
              <span className="pollutant-name">PM2.5</span>
              <span className="pollutant-value">{airQuality.pm25} μg/m³</span>
            </div>
            <div className="pollutant-item">
              <span className="pollutant-name">PM10</span>
              <span className="pollutant-value">{airQuality.pm10} μg/m³</span>
            </div>
            <div className="pollutant-item">
              <span className="pollutant-name">O₃</span>
              <span className="pollutant-value">{airQuality.o3} μg/m³</span>
            </div>
            <div className="pollutant-item">
              <span className="pollutant-name">NO₂</span>
              <span className="pollutant-value">{airQuality.no2} μg/m³</span>
            </div>
          </div>
        </div>
      )}

      {/* Weather Alerts */}
      {selectedView === 'alerts' && (
        <div className="weather-alerts">
          <h3>Weather Alerts</h3>
          {weatherAlerts.length > 0 ? (
            weatherAlerts.map((alert, index) => (
              <div key={index} className={`alert-item ${alert.severity.toLowerCase()}`}>
                <div className="alert-header">
                  <span className="alert-icon">⚠️</span>
                  <span className="alert-type">{alert.type}</span>
                  <span className="alert-severity">{alert.severity}</span>
                </div>
                <p className="alert-description">{alert.description}</p>
                <div className="alert-time">
                  {alert.startTime} - {alert.endTime}
                </div>
              </div>
            ))
          ) : (
            <div className="no-alerts">
              <span className="no-alerts-icon">✅</span>
              <p>No active weather alerts</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;

