import React, { PropTypes, Component } from 'react';
import ReactSpinner from 'react-spinjs';

class LoadingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.setToLoading = this.setToLoading.bind(this);
  }
  isLoading(loading) {
    this.setState({loading})
  }

  setToLoading() {
    if(this.props.loading) {
      let loading = true;
      this.setState({loading});
    }
  }

  render() {
    if(this.state.loading) {
      return (
        <div>
          <ReactSpinner />
        </div>
      );
    } else {
      return (
        <div>

        </div>
      );
    }
  }
}

export default LoadingModal;
