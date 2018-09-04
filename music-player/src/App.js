import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
                <div className="player__current-time">0:40</div>
                <div className="player__scroll">
                  <div className="player__scroll-location"></div>
                </div>
                <div className="player__total-time">3:17</div>
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
