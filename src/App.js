import React, { Component } from 'react';
import classes from './App.module.scss';
import WeatherContainer from './Containers/WeatherContainer';

class App extends Component {

  render() {
    return (
      <div className={classes.app}>
        <WeatherContainer />
      </div>
    );
  }
}

export default App;
