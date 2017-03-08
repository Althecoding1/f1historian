import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Circuits from '../presentation/Circuits.jsx';
import { Parallax, Background } from 'react-parallax';
import Map from 'google-maps-react';
import '../../../../stylesheets/main.scss';


class CircuitsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      circuits: [],
      circuitsFull: [],
      circuitsSmall: [],
      displayedCircuits: [],
    };
    this.getGoogleMaps = this.getGoogleMaps.bind(this);
    this.renderFullCircuit = this.renderFullCircuit.bind(this);
  }

  getGoogleMaps(long, lat) {
    axios.get('/api/location/' + long + '/' + lat)
    .then( (result) => {
      let body = document.getElementsByTagName('body')[0];
      body.append(<script> + result.data + </script>);
      result.data();
        let map = new google.maps.Map(document.getElementsByClassName('map'), {
          center: {lat: lat, lng: long},
          zoom: 8
        });
      initMap();
    })
  }

  renderFullCircuit(i, bool, longitude, latitude) {
    if(longitude && latitude) {
    }
    let displayedCircuits = this.state.displayedCircuits;
    let fullCircuitWindow;
    if(bool) {
      fullCircuitWindow = this.state.circuitsFull[i];
    }
    else {
      fullCircuitWindow = this.state.circuitsSmall[i];
    }
    displayedCircuits[i] = fullCircuitWindow;
    this.setState({displayedCircuits});
  }
  scrollToTop() {

  }

  componentWillReceiveProps(nextProps) {
    let circuitsSmall = nextProps.circuits.circuits.map( (circuit, index) => {
      let long = circuit.lng;
      let lat = circuit.lat;
      return (
        <div className="col-sm-6" key={index}>
          <div className="circuitResultSm" value={index} onClick={() => this.renderFullCircuit(index, true, long, lat)}>
            <div className="circuitSmImg">
              <img src={circuit.image_backgrounds} />
            </div>
            <div className="circuitTitleSm">
              {circuit.circuitName}
            </div>
          </div>
        </div>
      )
    });
    let displayedCircuits = nextProps.circuits.circuits.map( (circuit, index) => {
      let long = circuit.lng;
      let lat = circuit.lat;
      return (
        <div className="col-sm-6" key={index}>
          <div className="circuitResultSm" value={index} onClick={() => this.renderFullCircuit(index, true, long, lat)}>
            <div className="circuitSmImg">
              <img src={circuit.image_backgrounds} />
            </div>
            <div className="circuitTitleSm">
              {circuit.circuitName}
            </div>
          </div>
        </div>
      )
    });
    let circuitsFull = nextProps.circuits.circuits.map( (circuit, index) => {
      return (
        <div className="col-sm-12" key={index}>
          <div className="circuitResult" onClick={() => this.renderFullCircuit(index, false)}>
            <div className="circuitImg">
              <Parallax strength={100} bgImage={circuit.image_backgrounds} bgHeight={'720px'}
                  bgStyle={{position: 'relative', display: 'inline-block', overflow: 'hidden', height: '50em',border: '2px solid white'}}>
                <div className="circuitTitle">
                  {circuit.circuitName}
                </div>
                <div className="map" />
              </Parallax>
            </div>
          </div>
        </div>
      )
    });
    this.setState({circuitsFull, circuitsSmall, displayedCircuits});
  }

  render() {
    let circuit;
    if(this.props.circuits.circuits) {
      circuit = (
        <div className="circuitNavTopBar">
          <div className="circuitButton hvr-grow-rotate">
            <img src="http://i393.photobucket.com/albums/pp19/Althecoding1/circuitLink_zpsqs1rkoqb.png" />
          </div>
          <div className="circuitNavTitle">
            <div className="circuit-right" onClick={this.scrollToTop}>
              <i className="icon-chevron-up"></i>
            </div>
            <h3>Circuits</h3>
          </div>
        </div>
      )
    }
    return(
      <Circuits circuits={this.state.displayedCircuits} circuitNav={circuit}/>
    );
  }
}

export default CircuitsPage;
