import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../utility/updatedObject';

const initialState = {
  isLoading: false,
  isWeatherUpdating: false,
  errorData: null
}

const toggleIsLoading = (state, action) => {
  return updatedObject(state, { isLoading: action.isLoading })
}

const toggleIsWeatherUpdating = (state, action) => {
  return updatedObject(state, { isWeatherUpdating: action.isWeatherUpdating })
}

const setError = (state, action) => {
  return updatedObject(state, { errorData: action.errorData })
}

const clearError = (state) => {
  return updatedObject(state, { errorData: null })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_IS_LOADING: return toggleIsLoading(state, action)
    case actionTypes.TOGGLE_IS_WEATHER_UPDATING: return toggleIsWeatherUpdating(state, action)
    case actionTypes.SET_ERROR: return setError(state, action)
    case actionTypes.CLEAR_ERROR: return clearError(state, action)
    default: return state;
  }
}

export default reducer;