import React from 'react';
import classes from './Weather.module.scss';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../UI/Spinner';

const Weather = ({
  weatherData,
  isLoading,
  iconSrc,
  isWeatherUpdating,
  updateWeatherData,
  errorData,
  isKnowCurrentUserLocation,
  toggleTheme,
  lightTheme
}) => {
  let cssClasses = [
    classes.weather,
    !isKnowCurrentUserLocation && classes.dangerBorder,
    !lightTheme && classes.lightBorder]
    .join(' ');
  let weather;
  if (!weatherData || isLoading) {
    weather = <Spinner />
  }
  if (weatherData) {
    weather = (
      <Auxiliary>
        {/* if user don't let access to geolocation show this message */}
        {!isKnowCurrentUserLocation &&
          <p className={classes.error}>
            Please, let the browser get your geolocation:<br />
             default geolocation is Kyiv city
          </p>}
        <p>{new Date().toLocaleDateString()}</p>
        <h2>{weatherData.name}</h2>
        <hr />
        <p>{(weatherData.main.temp - 273).toFixed(0)}&deg;</p>
        <p>
          <img
            src={iconSrc ? iconSrc : ''}
            alt={weatherData.weather[0].main} />
        </p>
        <p>{weatherData.weather[0].main}</p>
        <p>Last update: {
          isWeatherUpdating ?
            'Updating...' :
            new Date().toLocaleTimeString()}</p>
        <button
          disabled={isWeatherUpdating}
          onClick={updateWeatherData}>
          {isWeatherUpdating ?
            'Updating...' :
            'Get current weather'}
        </button>
        <div>
          <button
            onClick={toggleTheme}
          >Change theme</button>
        </div>
      </Auxiliary>
    )
  }
  return (
    <div className={cssClasses}>
      {weather}
      {/* if get errorData show message for error */}
      {errorData &&
        <Auxiliary>
          <div className={classes.error}>
            <p>{errorData}</p>
          </div>
        </Auxiliary>}
    </div>
  )
}
export default Weather;