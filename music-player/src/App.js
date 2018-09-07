import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HorizontalSlider from './horizontalSlider.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {intervalID: null, onPlay: false, runningTime: 200000, currentTime: 0};
  }

  setLocation(percentage) {
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
    console.log('now playing...');
  }

  pause() {
    console.log('im paused!');
  }

  run() {
    this.state.onPlay ? this.play() : this.pause();
  }

  togglePlayButton() {
    this.setState(state => {
      return {onPlay: state.onPlay ? false: true}
    })
    this.run(); // promise로 해야될 듯
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
                  className="player__button player__button--pause-play"
                  style={{background: this.state.onPlay ? 'red' : 'none'}}></div>
                <div className="player__button player__button--forward"></div>
                <div className="player__button player__button--repeat"></div>
              </div>
              <div className="player__scroll-wrap">
                <div className="player__current-time">{this.convertTime(this.state.currentTime)}</div>
                <HorizontalSlider
                onChangePosition={this.setLocation.bind(this)}
                onReleaseMouse={this.run.bind(this)}
                position={this.state.position}/>
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
