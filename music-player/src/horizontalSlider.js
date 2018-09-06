import React, { Component } from 'react';

class HorizontalSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {offsetX: 0};
  }

  changePosition({target, clientX}) {
    const {width: sliderWidth, left: sliderLeftX, right: sliderRightX} = target.getBoundingClientRect();
    let activatedSliderWidth;

    if(!clientX) activatedSliderWidth = this.state.offsetX;
    else activatedSliderWidth = clientX >= sliderRightX ? sliderWidth : clientX <= sliderLeftX ? 0 : clientX - sliderLeftX;

    const percentage = (activatedSliderWidth / sliderWidth) * 100;

    this.setState({offsetX: activatedSliderWidth});
    if(this.props.onChangePosition) this.props.onChangePosition(percentage);
  }

  setDragImageInvisible(event) {
    const invisibleElem = document.createElement('img');
    event.dataTransfer.setDragImage(invisibleElem, 0, 0);
  }

  releaseMouse() {
    if(!this.props.onReleaseMouse) return;
    this.props.onReleaseMouse();
  }

  render(){
    return (
    <div
      className="player__scroll-boundary"
      draggable='true'
      onDragStart={this.setDragImageInvisible.bind(this)}
      onDrag={this.changePosition.bind(this)}
      onMouseDown={this.changePosition.bind(this)}
      onMouseUp = {this.releaseMouse.bind(this)}>
      <div className="player__scroll">
        <div className="player__scroll-location" style={{width: this.state.offsetX}}/>
      </div>
    </div>
    );
  }
}

export default HorizontalSlider;