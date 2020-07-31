import React from 'react';
import classes from './Weather.module.scss';
import Auxiliary from '../hoc/Auxiliary/Auxiliary';
import Spinner from './UI/Spinner';
const Weather = props => {
  const {
    weatherData,
    isLoading,
    iconSrc,
    isWeatherUpdating,
    updateWeatherData,
    errorData } = props;

  let weather = null;
  if (isLoading) {
    weather = <Spinner />
  }
  if (weatherData) {
    weather = (
      <Auxiliary>
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
      </Auxiliary>
    )
  }
  return (
    <div className={classes.weather}>
      {weather}
      {errorData ?
        <Auxiliary>
          <div className={classes.error}>
            <p>{errorData}</p>
            <button
              onClick={() => { console.log('clicked') }}>
              Try to get the current weather
        </button>
          </div>

        </Auxiliary> : null}
    </div>
  )
}
export default Weather;