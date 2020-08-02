import * as actionTypes from '../actions/actionTypes';

const initialState = {
  weatherData: null,
  iconSrc: null,
  isKnowCurrentUserLocation: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_WEATHER: return { ...state, weatherData: action.weatherData }
    case actionTypes.SET_ICON: return { ...state, iconSrc: action.iconSrc }
    case actionTypes.TOGGLE_IS_KNOW_CURRENT_USER_LOCATION: return { ...state, isKnowCurrentUserLocation: action.isKnowCurrentUserLocation }
    default: return state;
  }
}

export default reducer;