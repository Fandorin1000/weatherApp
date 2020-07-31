import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../utility/API';



const weatherRequestSuccess = weatherData => ({ type: actionTypes.SET_WEATHER, weatherData });
const iconRequestSuccess = iconSrc => ({ type: actionTypes.SET_ICON, iconSrc: iconSrc });

const getIconRequest = data => async dispatch => {
  try {
    const response = await axios.get(`http://openweathermap.org/img/wn/${data}@2x.png`);
    dispatch(iconRequestSuccess(response.config.url));
  }
  catch (error) {
    dispatch(actions.setError(error.message))
    console.log(error.message)
  }
}

export const getWeatherRequest = () => async dispatch => {
  dispatch(actions.toggleIsLoading(true));
  try {
    dispatch(actions.clearError())
    const response = await axios.get('users');
    await dispatch(getIconRequest(response.data.weather[0].icon));
    await dispatch(weatherRequestSuccess(response.data));
    dispatch(actions.toggleIsLoading(false));
  }
  catch (error) {
    await dispatch(actions.setError(error.message));
    console.log(error);
    dispatch(actions.toggleIsLoading(false));
  }
}

export const updateWeatherRequest = () => async dispatch => {
  dispatch(actions.toggleIsWeatherUpdating(true));
  try {
    dispatch(actions.clearError());
    const response = await axios.get('users');
    await dispatch(getIconRequest(response.data.weather[0].icon));
    await dispatch(weatherRequestSuccess(response.data));
    dispatch(actions.toggleIsWeatherUpdating(false));
  }
  catch (error) {
    console.log(error.message);
    dispatch(actions.toggleIsWeatherUpdating(false));
    dispatch(actions.setError(error.message))
  }
}













