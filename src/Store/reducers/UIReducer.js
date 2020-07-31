import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isWeatherUpdating: false,
  errorData: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_IS_LOADING: return { ...state, isLoading: action.isLoading }
    case actionTypes.TOGGLE_IS_WEATHER_UPDATING: return { ...state, isWeatherUpdating: action.isWeatherUpdating }
    case actionTypes.SET_ERROR: return { ...state, errorData: action.errorData }
    case actionTypes.CLEAR_ERROR: return { ...state, errorData: action.null }
    default: return state;
  }
}

export default reducer;