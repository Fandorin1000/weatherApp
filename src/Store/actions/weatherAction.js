import * as actionTypes from './actionTypes';
import * as actions from './index';
import weatherAPI from '../../utility/API';



const weatherRequestSuccess = weatherData => ({ type: actionTypes.SET_WEATHER, weatherData });
const iconRequestSuccess = iconSrc => ({ type: actionTypes.SET_ICON, iconSrc: iconSrc });

const getIconRequest = data => async dispatch => {
  try {
    const response = await weatherAPI.getIcon(data);
    await dispatch(iconRequestSuccess(response.config.url));
  }
  catch (error) {
    await dispatch(actions.setError(error.message))
  }
}

const toggleIsKnowCurrentUserLocation = (isKnowCurrentUserLocation) => {
  return {
    type: actionTypes.TOGGLE_IS_KNOW_CURRENT_USER_LOCATION,
    isKnowCurrentUserLocation
  }
}

const checkCoords = coords => async dispatch => {
  let response;
  if (coords) {
    response = await weatherAPI.getWeatherForCoordinations(coords.latitude, coords.longitude);
    await dispatch(toggleIsKnowCurrentUserLocation(true))
  } else {
    response = await weatherAPI.getWeatherForID(703448);
    await dispatch(toggleIsKnowCurrentUserLocation(false))
  }
  return response;
}
const getWeatherRequest = (coords) => async dispatch => {
  await dispatch(actions.clearError());
  let response = await dispatch(checkCoords(coords));
  await dispatch(getIconRequest(response.data.weather[0].icon));
  await dispatch(weatherRequestSuccess(response.data));
}
export const getWeatherAll = (coords) => async dispatch => {
  await dispatch(actions.toggleIsLoading(true));
  try {
    await dispatch(getWeatherRequest(coords))
    await dispatch(actions.toggleIsLoading(false));
  }
  catch (error) {
    await dispatch(actions.setError(error.message));
    await dispatch(actions.toggleIsLoading(false));
  }
}

export const updateWeatherAll = (coords) => async dispatch => {
  await dispatch(actions.toggleIsWeatherUpdating(true));
  try {
    await dispatch(getWeatherRequest(coords))
    await dispatch(actions.toggleIsWeatherUpdating(false));
  }
  catch (error) {
    await dispatch(actions.toggleIsWeatherUpdating(false));
    await dispatch(actions.setError(error.message))
  }
}













