import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../utility/updatedObject';

const initialState = {
  weatherData: null,
  iconSrc: null,
  isKnowCurrentUserLocation: false
}

const setWeather = (state, action) => {
  return updatedObject(state, { weatherData: action.weatherData })
};
const setIcon = (state, action) => {
  return updatedObject(state, { iconSrc: action.iconSrc })
}
const toggleIsKnowCurrentUserLocation = (state, action) => {
  return updatedObject(state, { isKnowCurrentUserLocation: action.isKnowCurrentUserLocation })
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_WEATHER: return setWeather(state, action)
    case actionTypes.SET_ICON: return setIcon(state, action)
    case actionTypes.TOGGLE_IS_KNOW_CURRENT_USER_LOCATION: return toggleIsKnowCurrentUserLocation(state, action)
    default: return state;
  }
}

export default reducer;