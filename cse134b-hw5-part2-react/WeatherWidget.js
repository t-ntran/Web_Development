import React, { useEffect, useState } from 'react';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiUrl = 'https://api.weather.gov/gridpoints/SGX/53,20/forecast?units=us';
        const response = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/geo+json',
          },
        });
        const data = await response.json();
        const weather = data.properties.periods[0];
        setWeatherData(weather);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setOffline(true);
      }
    };

    if (navigator.onLine) {
      fetchWeather();
    } else {
      setOffline(true);
    }
  }, []);

  return (
    <div>
      <div id="weatherIcon" style={{ fontSize: '3em' }}>
        {weatherData ? (
          <p>{weatherData.shortForecast}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div id="weatherInfo">
        {weatherData ? (
          <>
            <p>{weatherData.shortForecast}</p>
            <p>Temperature: {weatherData.temperature} ° {weatherData.temperatureUnit}</p>
            <p>Humidity: {weatherData.relativeHumidity.value} %</p>
            <p>Probability of Precipitation: {weatherData.probabilityOfPrecipitation.value} %</p>
            <p>Wind: {weatherData.windSpeed} {weatherData.windDirection}</p>
          </>
        ) : (
          <p>Current Weather Conditions Unavailable</p>
        )}
        {offline && <p>Last Update: Offline</p>}
      </div>
    </div>
  );
};

export default WeatherWidget;
