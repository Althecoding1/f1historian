import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Modal from 'react-modal';

class DriverModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        driverInfo: {},
        modalStyle: {
          overlay: {
          },
          content: {
            top: "11em",
          }
        },
        driverSummary: '',
        driverInfoBox: {}
      };
      this.closeModal = this.closeModal.bind(this);
      this.loadDriverWikiData = this.loadDriverWikiData.bind(this);
    }
    componentWillMount() {
      let nextProps = this.props;
      if(nextProps.open) {
        let isOpen = true;
        let driverInfo = nextProps.driverData;
        this.loadDriverWikiData(nextProps.driverData);
        this.setState({isOpen, driverInfo});
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.open) {
        let isOpen = true;
        let driverInfo = nextProps.driverData;
        this.setState({isOpen, driverInfo});
      }
    }

    closeModal() {
      let isOpen = false;
      this.setState({isOpen});
    }

    loadDriverWikiData(driver) {
      let url = '/api/wiki/driver/' + driver.forename + '/' + driver.surname;
      let infoBoxUrl = '/api/infobox/driver/' + driver.forename + '/' + driver.surname;
      let retrievedData = {};
      axios.get(infoBoxUrl)
      .then( (result) => {
        console.log(result);
        retrievedData.summary = result.data;
      });
    }

    render() {
      let driver = this.state.driverInfo;
      return (
        <Modal
          isOpen={this.state.isOpen}
          style={this.state.modalStyle}
          contentLabel="driverModal">
          <div className="driverTitle">
            <div className="driverImage">
            </div>
            <div className="driverName">
              {driver.forename + " " + driver.surname}
            </div>
          </div>
          <div className="driverInfoButtons">

          </div>

          <button className="closeModalButton button btn" onClick={this.closeModal}>close</button>
        </Modal>
      );
    }
}

export default DriverModal;
