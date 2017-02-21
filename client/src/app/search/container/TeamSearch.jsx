import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import SearchDrivers from './Search.jsx';

class TeamSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      teams: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.generateConstructors();
  }

  generateConstructors() {
    axios.get('/api/teams')
    .then( (res) => {
      this.setState({teams: res.data.map( (team, index) => {
        return (
          <MenuItem value={index} primaryText={team.name} key={index}/>
        )
      })})
    })
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    console.log(this.state);
    return(
      <SearchDrivers
        teams={this.state.teams}
        tValue={this.state.value}
        tonChange={this.handleChange}
      />
    );
  }
}

export default TeamSearch;
