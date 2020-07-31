import React, { Component } from 'react';
import classes from './WeatherContainer.module.scss';
import Weather from '../Components/Weather';
import { connect } from 'react-redux';
import * as actions from '../Store/actions/index';
import {
  getWeatherDataSelector,
  getIconSrcSelector
} from '../Store/selectors/weatherSelectors';
import {
  getIsLoadingSelector,
  getIsWeatherUpdatingSelector,
  getErrorDataSelector
} from '../Store/selectors/UISelectors';

class WeatherContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.onGetWeather()
  }
  shouldComponentUpdate(nextProps) {
    const { isLoading, isWeatherUpdating } = this.props;
    if (
      isLoading !== nextProps.isLoading ||
      isWeatherUpdating !== nextProps.isWeatherUpdating
    ) {
      return true;
    }
    return false;
  }
  updateWeatherData = () => {
    this.props.onUpdateWeatherData()
  }
  errorReset = () => {
    this.props.onResetError()
  }
  render() {
    const { weatherData, isLoading, iconSrc, isWeatherUpdating, errorData } = this.props;
    return (
      <div className={classes.weatherContainer}>
        <Weather
          weatherData={weatherData}
          isLoading={isLoading}
          iconSrc={iconSrc}
          isWeatherUpdating={isWeatherUpdating}
          updateWeatherData={this.updateWeatherData}
          errorData={errorData}
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
    errorData: getErrorDataSelector(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onGetWeather: () => dispatch(actions.getWeatherRequest()),
    onUpdateWeatherData: () => dispatch(actions.updateWeatherRequest())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);