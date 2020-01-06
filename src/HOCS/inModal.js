import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';

const putInModal = InModal => {
  class inModal extends Component {
    onClose = e => {
      this.props.onClose &&
        this.props.onClose(e); //ensures there is a definition for onClose
    };

    render() {
      //if not show then contents are not returned
      if (!this.props.show) {
        return null;
      } else {
        return (
          <InModal>
            <div></div>
          </InModal>
        );
      }
    }
  }

  inModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };
};

export default putInModal;
