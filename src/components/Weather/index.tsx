import { useState } from "react";
import axios from "axios";
import './Weather.scss';

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [weatherError, setWeatherError] = useState(null);

  const fetchData = async () => {
    try {
      setWeatherError(null);
      setWeather(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6373f86f827bb839d444dcc6d7180fbd`
      );
      setWeather(response.data);
    } catch (error: any) {
      setWeatherError(error?.response?.data?.message);
    }
  };

  const handleInputChange = (e: any) => {
    setCity(e.target.value);
  };

  return (
    <div className="weatherContainer">
      <div className="weatherHeader">Weather Forecast</div>
      <div className="weatherSearch">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={fetchData}>Search</button>
      </div>
      {weather && (
        <div className="weatherInfo">
          <h2>{weather.name}</h2>
          <p className="temperature">{weather.main.temp}°C</p>
          <p className="description">{weather.weather[0].description}</p>
          <div className="weatherDetails">
            <div>
              <p>Humidity</p>
              <p>{weather.main.humidity}%</p>
            </div>
            <div>
              <p>Wind</p>
              <p>{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
      {weatherError && <p className="weatherError">{weatherError}</p>}
    </div>
  );
}

export default Weather;
