import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';

class DriverModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      };
    }

    render() {
      return (
        <Modal isOpen={this.state.isOpen}>
          <h1>Here</h1>
        </Modal>
      );
    }
}

export default DriverModal;
