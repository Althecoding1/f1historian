import React, { Component } from 'react';
import { render } from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import SearchDrivers from '../presentation/SearchDrivers.jsx';
import axios from 'axios';
import '../../../../stylesheets/main.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    let props = this.props;
    console.log(props);
    return (
      <div></div>
    )
  }
}

export default Search;
