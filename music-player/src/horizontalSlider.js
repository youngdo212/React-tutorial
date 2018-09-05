import React, { Component } from 'react';

class HorizontalSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {offsetX: 0};
  }

  clickPosition({target, clientX}) {
    const rect = target.getBoundingClientRect();
    const distance = clientX - rect.left;
    this.setState({offsetX: distance})
  }

  render(){
    return (
    <div className="player__scroll-boundary" onClick={this.clickPosition.bind(this)}>
      <div className="player__scroll">
        <div className="player__scroll-location" style={{width: this.state.offsetX}}/>
      </div>
    </div>
    );
  }
}

export default HorizontalSlider;