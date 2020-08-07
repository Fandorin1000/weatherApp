import React, { Component } from 'react';
import classes from './App.module.scss';
import WeatherContainer from './Containers/WeatherContainer';
import { connect } from 'react-redux';
import {
  getThemeSelector
} from './Store/selectors/UISelectors';
class App extends Component {

  render() {
    const { lightTheme } = this.props;
    let cssClasses = [classes.app, lightTheme ? null : classes.inverse].join(' ')
    return (
      <div className={cssClasses}>
        <WeatherContainer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  lightTheme: getThemeSelector(state)
})
export default connect(mapStateToProps)(App);
