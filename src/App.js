import "./App.css";
import React, { useEffect, useState } from "react";

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCityKey, setSelectedCityKey] = useState(null);
  const [weatherInformation, setWeatherInformation] = useState({
    isWeather: false,
    weatherCodition: "",
    celsius: "",
    fahrenheit: "",
  });

  const onCityChange = (e) => {
    setSelectedCityKey(e.target.value);
  };

  const getWeatherInformation = () => {
    var apiKey = "WhUAQOfy4yagJiErGEcIHUYxBPJte5YN";
    fetch(
      "http://dataservice.accuweather.com/currentconditions/v1/" +
        selectedCityKey +
        "?apikey=" +
        apiKey
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setWeatherInformation({
            isWeather: true,
            weatherCodition: result[0].WeatherText,
            celcius: result[0].Temperature.Metric.Value,
            fahrenheit: result[0].Temperature.Imperial.Value,
          });
        },
        (error) => {
          setError(error);
        }
      );
    console.log(weatherInformation);
  };

  useEffect(() => {
    var noOfCities = 100;
    var apiKey = "WhUAQOfy4yagJiErGEcIHUYxBPJte5YN";
    fetch(
      "http://dataservice.accuweather.com/locations/v1/topcities/" +
        noOfCities +
        "?apikey=" +
        apiKey
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCities(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h3>Select a City:</h3>
        <select
          id="city"
          onChange={(e) => {
            onCityChange(e);
          }}
        >
          <option value="none" defaultValue>
            None
          </option>
          {cities.map((city, index) => (
            <option key={index} value={city.Key}>
              {city.LocalizedName}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            getWeatherInformation();
          }}
        >
          Get Weather Information
        </button>
        <div>
          {weatherInformation.isWeather ? (
            <div>
              <h3>Weather Condition: {weatherInformation.weatherCodition}</h3>
              <h3>Temperature in Celcius: {weatherInformation.celsius}</h3>
              <h3>
                Temperature in Fahrenheit: {weatherInformation.fahrenheit}
              </h3>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
};

export default App;
