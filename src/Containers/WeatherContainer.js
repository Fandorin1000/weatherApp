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
  getThemeSelector
} from '../Store/selectors/UISelectors';

class WeatherContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    const location = navigator.geolocation;
    location.getCurrentPosition(pos => this.props.onGetWeather(pos.coords),
      () => this.props.onGetWeather()
    );
    this.checkTheme()
  }
  shouldComponentUpdate(nextProps) {
    const {
      isLoading,
      isWeatherUpdating,
      errorData,
      weatherData,
      lightTheme } = this.props;
    if (
      isLoading !== nextProps.isLoading ||
      isWeatherUpdating !== nextProps.isWeatherUpdating ||
      errorData !== nextProps.errorData ||
      weatherData !== nextProps.weatherData ||
      lightTheme !== nextProps.lightTheme
    ) {
      return true;
    }
    return false;
  }
  checkTheme = () => {
    const date = new Date()
    const currentTime = new Date(date).getHours()
    const conditionDate = new Date(date);
    conditionDate.setHours(20);
    const conditionTime = conditionDate.getHours()
    if (currentTime > conditionTime) {
      this.props.onToggleTheme()
    }
  }
  updateWeatherData = () => {
    const location = navigator.geolocation;
    location.getCurrentPosition(pos => this.props.onUpdateWeatherData(pos.coords),
      () => this.props.onUpdateWeatherData()
    )

  }
  toggleThemeHandler = () => {
    this.props.onToggleTheme()
  }
  errorReset = () => this.props.onResetError();
  render() {
    const {
      weatherData,
      isLoading,
      iconSrc,
      isWeatherUpdating,
      errorData,
      isKnowCurrentUserLocation,
      lightTheme
    } = this.props;
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
          toggleTheme={this.toggleThemeHandler}
          lightTheme={lightTheme}
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
    isKnowCurrentUserLocation: getIsKnowCurrentUserLocationSelector(state),
    lightTheme: getThemeSelector(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onGetWeather: (coords) => dispatch(actions.getWeatherAll(coords)),
    onUpdateWeatherData: (coords) => dispatch(actions.updateWeatherAll(coords)),
    onToggleTheme: () => dispatch(actions.toggleTheme())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);