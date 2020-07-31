import * as actionTypes from './actionTypes';


export const toggleIsLoading = isLoading => ({ type: actionTypes.TOGGLE_IS_LOADING, isLoading });
export const toggleIsWeatherUpdating = isWeatherUpdating => ({
  type: actionTypes.TOGGLE_IS_WEATHER_UPDATING, isWeatherUpdating
})
export const setError = errorData => ({ type: actionTypes.SET_ERROR, errorData });
