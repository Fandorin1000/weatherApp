import React, { Component } from 'react';
import classes from './WeatherContainer.module.scss';
import Weather from '../Components/Weather';
import { connect } from 'react-redux';
import * as actions from '../Store/actions/index';
import {
  getWeatherDataSelector,
  getIconSrcSelector,
  getIsKnowCurrentUserLocationSelector
} from '../Store/selectors/weatherSelectors';
import {
  getIsLoadingSelector,
  getIsWeatherUpdatingSelector,
  getErrorDataSelector,

} from '../Store/selectors/UISelectors';

class WeatherContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.props.onGetWeather(position.coords);
    })
    this.props.onGetWeather();
  }
  shouldComponentUpdate(nextProps) {
    const { isLoading, isWeatherUpdating, errorData, weatherData } = this.props;
    if (
      isLoading !== nextProps.isLoading ||
      isWeatherUpdating !== nextProps.isWeatherUpdating ||
      errorData !== nextProps.errorData ||
      weatherData !== nextProps.weatherData
    ) {
      return true;
    }
    return false;
  }
  updateWeatherData = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.props.onUpdateWeatherData(position.coords);
    })
    this.props.onUpdateWeatherData()
  }
  errorReset = () => {
    this.props.onResetError()
  }
  render() {
    const { weatherData, isLoading, iconSrc, isWeatherUpdating, errorData, isKnowCurrentUserLocation } = this.props;
    return (
      <div className={classes.weatherContainer}>
        <Weather
          weatherData={weatherData}
          isLoading={isLoading}
          iconSrc={iconSrc}
          isWeatherUpdating={isWeatherUpdating}
          updateWeatherData={this.updateWeatherData}
          errorData={errorData}
          isKnowCurrentUserLocation={isKnowCurrentUserLocation}
        />

      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    weatherData: getWeatherDataSelector(state),
    isLoading: getIsLoadingSelector(state),
    iconSrc: getIconSrcSelector(state),
    isWeatherUpdating: getIsWeatherUpdatingSelector(state),
    errorData: getErrorDataSelector(state),
    isKnowCurrentUserLocation: getIsKnowCurrentUserLocationSelector(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onGetWeather: (coords) => dispatch(actions.getWeatherRequest(coords)),
    onUpdateWeatherData: (coords) => dispatch(actions.updateWeatherRequest(coords))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);