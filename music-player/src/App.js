import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HorizontalSlider from './horizontalSlider.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {percentage: 0, runningTime: 200000};
  }

  setLocation(a) {
    this.setState({percentage: a});
  }

  convertTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedMinutes = minutes.toString();
    const formattedSeconds = seconds.toString().padStart(2, 0);
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  calcCurrentTime(percentage, runningTime) {
    return ( percentage / 100 ) * runningTime;
  }

  render() {
    return (
      <section className="player">
        <div className="player__wrap">
          <div className="player__current-song">
            <div className="player__album-cover"></div>
            <div className="player__song-title">Title</div>
            <div className="player__singer">singer</div>
          </div>
          <div className="player__controls">
            <div className="player__controls-wrap">
              <div className="player__button-wrap">
                <div className="player__button player__button--shuffle"></div>
                <div className="player__button player__button--back"></div>
                <div className="player__button player__button--pause-play"></div>
                <div className="player__button player__button--forward"></div>
                <div className="player__button player__button--repeat"></div>
              </div>
              <div className="player__scroll-wrap">
                <div className="player__current-time">{this.convertTime(this.calcCurrentTime(this.state.percentage,this.state.runningTime))}</div>
                <HorizontalSlider onChangePosition={this.setLocation.bind(this)}/>
                <div className="player__total-time">{this.convertTime(this.state.runningTime)}</div>
              </div>
            </div>
          </div>
          <div className="player__option-wrap">
            <div className="player__option player__option--queue"></div>
            <div className="player__option player__option--devices"></div>
            <div className="player__option player__option--mute"></div>
            <div className="player__volume">
              <div className="player__volume-location"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
