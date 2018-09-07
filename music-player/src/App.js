import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HorizontalSlider from './horizontalSlider.js';
import { rejects } from 'assert';

class App extends Component {
  constructor(props) {
    super(props);
    props.core.onReturnCurrentTime = this.setCurrentTime.bind(this);
    this.state = {onPlay: false, runningTime: props.core.runningTime, currentTime: 0, positionPercentage: 0};
  }

  // core가 현재 시간을 바꿨을 때 positionPercentage까지 변경
  setCurrentTime(time) {
    const positionPercentage = (time / this.state.runningTime) * 100;
    this.setState({currentTime: time, positionPercentage: positionPercentage});
  } // 아래와 중복

  // slider drag로 position을 변경했을 때 currentTime만 변경
  setCurrentTimeByPercentage(percentage) {
    const currentTime = (percentage / 100) * this.state.runningTime;
    this.setState({currentTime: currentTime});
  }

  convertTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedMinutes = minutes.toString();
    const formattedSeconds = seconds.toString().padStart(2, 0);
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  play() {
    this.props.core.play();
  }

  pause() {
    this.props.core.pause();
  }

  run() {
    this.props.core.set(this.state.currentTime);
    this.state.onPlay ? this.play() : this.pause();
  }

  togglePlayButton() {
    Promise.resolve()
      .then(() => {
        this.setState(state => {
          return {onPlay: state.onPlay ? false: true}
        });
        return Promise.resolve();
      })
      .then(this.run.bind(this));
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
                <div
                  onClick={this.togglePlayButton.bind(this)}
                  className={`player__button ${this.state.onPlay ? "player__button--pause" : "player__button--play"}`}>
                </div>
                <div className="player__button player__button--forward"></div>
                <div className="player__button player__button--repeat"></div>
              </div>
              <div className="player__scroll-wrap">
                <div className="player__current-time">{this.convertTime(this.state.currentTime)}</div>
                <HorizontalSlider
                onChangePosition={this.setCurrentTimeByPercentage.bind(this)}
                onPressMouse={this.pause.bind(this)}
                onReleaseMouse={this.run.bind(this)}
                initialPositionPercentage={this.state.positionPercentage}/>
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
