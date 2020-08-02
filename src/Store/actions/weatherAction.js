import * as actionTypes from './actionTypes';
import * as actions from './index';
import weatherAPI from '../../utility/API';



const weatherRequestSuccess = weatherData => ({ type: actionTypes.SET_WEATHER, weatherData });
const iconRequestSuccess = iconSrc => ({ type: actionTypes.SET_ICON, iconSrc: iconSrc });

const getIconRequest = data => async dispatch => {
  try {
    const response = await weatherAPI.getIcon(data);
    dispatch(iconRequestSuccess(response.config.url));
  }
  catch (error) {
    dispatch(actions.setError(error.message))
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
    dispatch(toggleIsKnowCurrentUserLocation(true))
  } else {
    response = await weatherAPI.getWeatherForID();
    dispatch(toggleIsKnowCurrentUserLocation(false))
  }
  return response;
}
export const getWeatherRequest = (coords) => async dispatch => {
  dispatch(actions.toggleIsLoading(true));
  try {
    dispatch(actions.clearError());
    let response = await dispatch(checkCoords(coords));
    await dispatch(getIconRequest(response.data.weather[0].icon));
    dispatch(weatherRequestSuccess(response.data));
    dispatch(actions.toggleIsLoading(false));
  }
  catch (error) {
    dispatch(actions.setError(error.message));
    dispatch(actions.toggleIsLoading(false));
  }
}

export const updateWeatherRequest = (coords = undefined) => async dispatch => {
  dispatch(actions.toggleIsWeatherUpdating(true));
  try {
    dispatch(actions.clearError());
    let response = await dispatch(checkCoords(coords));
    await dispatch(getIconRequest(response.data.weather[0].icon));
    await dispatch(weatherRequestSuccess(response.data));
    dispatch(actions.toggleIsWeatherUpdating(false));
  }
  catch (error) {
    dispatch(actions.toggleIsWeatherUpdating(false));
    dispatch(actions.setError(error.message))
  }
}













