import React, { Component } from 'react';

class HorizontalSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {positionPercentage: props.initialPositionPercentage || 0};
  }

  changePosition({currentTarget, clientX}) {
    const {width: sliderWidth, left: sliderLeftX, right: sliderRightX} = currentTarget.getBoundingClientRect();

    const positionPercentage = this.calcPositionPercentage({sliderWidth, sliderLeftX, sliderRightX, clientX}) || this.props.positionPercentage;

    this.setState({positionPercentage});
    this.props.onChangePosition && this.props.onChangePosition(positionPercentage);
  }

  calcPositionPercentage({sliderWidth, sliderLeftX, sliderRightX, clientX}) {
    if(clientX === 0) return null; // when releasing mouse
    else if(clientX >= sliderRightX) return 100;
    else if(clientX < sliderLeftX) return 0;
    
    const positionWidth = clientX - sliderLeftX;
    
    return (positionWidth / sliderWidth) * 100;
  }

  setDragImageInvisible(event) {
    const invisibleElem = document.createElement('img');
    event.dataTransfer.setDragImage(invisibleElem, 0, 0);
  }

  releaseMouse() {
    this.props.onReleaseMouse && this.props.onReleaseMouse();
  }

  render(){
    return (
    <div
      className="player__scroll-boundary"
      draggable='true'
      onDragStart={this.setDragImageInvisible.bind(this)}
      onDrag={this.changePosition.bind(this)}
      onMouseDown={this.changePosition.bind(this)}
      onMouseUp = {this.releaseMouse.bind(this)}
      onDragEnd = {this.releaseMouse.bind(this)}>
      <div className="player__scroll">
        <div className="player__scroll-location" style={{width: `${this.state.positionPercentage}%`}}/>
      </div>
    </div>
    );
  }
}

export default HorizontalSlider;