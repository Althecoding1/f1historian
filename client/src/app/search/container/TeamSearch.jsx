import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

class TeamSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      teams: [],
      circuit: '',
      driver: '',
      year: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.generateConstructors();
  }

  generateConstructors() {
    let count = 0;
    axios.get('/api/teams')
    .then( (res) => {
      let teams = res.data.map( (team, index) => {
        count++;
        return <MenuItem value={count} primaryText={team.name} key={count}/>;
      })
      teams.unshift(<MenuItem value={0} primaryText="Constructors" key={0}/>);
      this.setState({teams});
    })
  }

  handleChange(event, index, value) {
    let circuit = document.getElementsByClassName("circuit")[0].children[0].children[1].innerHTML;
    let driver = document.getElementsByClassName("driver")[0].children[0].children[1].innerHTML;
    let year = document.getElementsByClassName('year')[0].children[0].children[1].innerHTML;
    this.setState({circuit, driver, year, value});
  }

  render() {
    return(
      <div className="constructorDropDown">
        <DropDownMenu value={this.state.value} onChange={this.handleChange} className="team">
          {this.state.teams}
        </DropDownMenu>
      </div>
    );
  }
}

export default TeamSearch;
