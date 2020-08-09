import React, { PureComponent } from 'react';
import classes from './WeatherContainer.module.scss';
import Weather from '../Components/Weather/Weather';
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

class WeatherContainer extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // if let access to geolocation send request with user coordination
    this.checkThemeHandler()
    this.props.onGetWeather()

    const location = navigator.geolocation;
    location.getCurrentPosition(pos => this.props.onGetWeather(pos.coords));
  }

  checkThemeHandler = () => {
    // condition current time >= 20 hours invite night theme
    const date = new Date()
    const currentTime = new Date(date).getHours()
    const conditionTime = 10
    if (currentTime >= conditionTime) {
      this.toggleThemeHandler()
    }
  }
  updateWeatherDataHandler = () => {
    //update weather Data
    const location = navigator.geolocation;
    location.getCurrentPosition(pos => this.props.onUpdateWeatherData(pos.coords),
      () => this.props.onUpdateWeatherData()
    )
  }
  toggleThemeHandler = () => {
    //toggle night/light theme
    this.props.onToggleTheme()
  }
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
          errorData={errorData}
          isKnowCurrentUserLocation={isKnowCurrentUserLocation}
          lightTheme={lightTheme}
          updateWeatherData={this.updateWeatherDataHandler}
          toggleTheme={this.toggleThemeHandler}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  weatherData: getWeatherDataSelector(state),
  isLoading: getIsLoadingSelector(state),
  iconSrc: getIconSrcSelector(state),
  isWeatherUpdating: getIsWeatherUpdatingSelector(state),
  errorData: getErrorDataSelector(state),
  isKnowCurrentUserLocation: getIsKnowCurrentUserLocationSelector(state),
  lightTheme: getThemeSelector(state)
})
const mapDispatchToProps = dispatch => ({
  onGetWeather: (coords) => dispatch(actions.getWeatherAll(coords)),
  onUpdateWeatherData: (coords) => dispatch(actions.updateWeatherAll(coords)),
  onToggleTheme: () => dispatch(actions.toggleTheme())
})
export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);