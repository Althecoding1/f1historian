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
            zIndex: 15,
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
        new Promise( (resolve, reject) => {
          let url = '/api/wiki/driver/' + driverInfo.forename + '/' + driverInfo.surname;
          axios.get(url)
          .then( (result) => {
            let driverSummary = result.data;
            resolve(driverSummary);
          });
        }).then( (resolution) => {
          let driverSummary = resolution;
          this.setState({isOpen, driverInfo, driverSummary});
        })
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.open) {
        let isOpen = true;
        let driverInfo = nextProps.driverData;
        new Promise( (resolve, reject) => {
          let url = '/api/wiki/driver/' + driverInfo.forename + '/' + driverInfo.surname;
          axios.get(url)
          .then( (result) => {
            let driverSummary = result.data;
            resolve(driverSummary);
          });
        }).then( (resolution) => {
          let driverSummary = resolution;
          this.setState({isOpen, driverInfo, driverSummary});
        })
      }
    }

    closeModal() {
      let isOpen = false;
      this.setState({isOpen});
    }

    loadDriverWikiData(driver) {
      let url = '/api/wiki/driver/' + driver.forename + '/' + driver.surname;
      axios.get(url)
      .then( (result) => {
        let driverSummary = result.data;
        return driverSummary;
      });
    }

    render() {
      let driver = this.state.driverInfo;
      return (
        <Modal
          isOpen={this.state.isOpen}
          style={this.state.modalStyle}
          onRequestClose={this.closeModal}
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
          <div className="wikiDesc">
            {this.state.driverSummary}
          </div>
          <button className="closeModalButton button btn" onClick={this.closeModal}>close</button>
        </Modal>
      );
    }
}

export default DriverModal;
