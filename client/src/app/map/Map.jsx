import React, { Component } from 'react';
import { render } from 'react-dom';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapInput, {
      center: {lat: this.props.lat, lng: this.props.lng},
      zoom: 12,
    });
    this.marker = new google.maps.Marker({
      position: {lat: this.props.lat, lng: this.props.lng},
      map: this.map,
    })
  }

  render() {
    let lng = this.props.lng;
    let lat = this.props.lat;
    return (
      <div ref={(input) => {this.mapInput = input; }} className="googleMap"/>
    );
  }
}

export default Map;
