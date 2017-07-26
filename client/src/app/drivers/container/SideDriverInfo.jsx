import React, { Component } from 'react';

class SideDriverInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: '',
      navHeight: '',
      driverStats: [],
      currentDriver: {
        nationality: '',
        team: '',
        totalPoints: '',
        podiums: ''
      }
    };
  }

  componentWillMount() {
    let driverStats, windowHeight, navHeight;
    windowHeight = window.innerHeight;
    navHeight = 106;
    if(this.props.stats) {
      driverStats = this.props.stats;
    }
    this.setState({driverStats, navHeight, windowHeight});
  }

  renderDriverData(e) {
    let drivers = document.getElementsByClassName('driverCards');
    let cardSize = drivers[0].getBoundingClientRect().bottom - drivers[0].getBoundingClientRect().top;
    let currPosBot, currPosTop, inPos = 0;
    for(let i = 0; i < drivers.length; i++) {
      currPosBot = drivers[i].getBoundingClientRect().bottom;
      currPosTop = drivers[i].getBoundingClientRect().top;
      if(currPosBot >= 111 && currPosTop <= 112) {
        inPos = i;
        break;
      }
    }
    if(inPos !== undefined) {
      let driverStates = this.state.driverStats;
      let driverInfo;
      for(let key in driverStates.moreData.drivers) {
        if(driverStates.moreData.drivers[key].surname === driverStates.driverData[inPos].surname && driverStates.moreData.drivers[key].forename === driverStates.driverData[inPos].forename) {
          driverInfo = driverStates.moreData.drivers[key];
        }
      }
      let currentDriver = Object.assign(driverStates.driverData[inPos], driverInfo);
      this.setState({currentDriver});
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', (e) => { this.renderDriverData(e) });
  }

  componentWillReceiveProps(nextProps) {
    let driverStats;
    if(nextProps.stats) {
      driverStats = nextProps.stats;
    }
    this.setState({driverStats});
  }

  render() {
    let currDriver = this.state.currentDriver;
    return (
      <div>
        <div className="driverInfoTitles">
          <div className="driverNationality">Nationality:
            <div className="updateValue">
              {currDriver.nationality}
            </div>
            </div>
          <div className="driverTeamName">Team:
            <div className="updateValue">
              {currDriver.name}
            </div>
          </div>
          <div className="driverPoints">Points:
            <div className="updateValue">
              {currDriver.totalPoints}
            </div>
          </div>
          <div className="driverPodiums">Podiums:
            <div className="updateValue">

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SideDriverInfo;
