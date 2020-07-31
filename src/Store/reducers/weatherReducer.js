import * as actionTypes from '../actions/actionTypes';

const initialState = {
  weatherData: null,
  iconSrc: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_WEATHER: return { ...state, weatherData: action.weatherData }
    case actionTypes.SET_ICON: return { ...state, iconSrc: action.iconSrc }
    default: return state;
  }
}

export default reducer;