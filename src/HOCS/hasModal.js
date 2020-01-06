import React, {
  Component
} from 'react';
const giveAModalTo = ModalOwner => {
  class HasModal extends Component {
    constructor(props) {
      super(props);
      this.state = { show: false };
      this.onClick = this.onClick.bind(
        this
      );
    }

    toggleModal = () => {
      this.setState({
        ...this.state,
        show: !this.state.show
      });
    };

    onClick = e => {
      this.toggleModal(e);
    };

    render() {
      return (
        <ModalOwner
          className="modalOwner"
          {...this.props}
          toggleModal={this.toggleModal}
          onClick={this.onClick}
        >
          <button className="modalOwner__openModal">
            {this.props.toggleText ||
              'open'}
          </button>
        </ModalOwner>
      );
    }
  }

  HasModal.displayName = `(${ModalOwner.displayName ||
    ModalOwner.name ||
    'Component'}HasModal`;
  return HasModal;
};

export default giveAModalTo;
