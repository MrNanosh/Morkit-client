import giveAModalTo from '../HOCS/hasModal';
import React, {
  Component
} from 'react';
import config from '../config';

class ForsaleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      want: false,
      check: false,
      outgoing: '',
      sent: false,
      more: false
    };
  }
  //needs to pop up a text box or modal to record an outgoing message
  //goes away but saves the input if either is false
  //the check and want buttons need to toggle onClick
  handlePostMessage = e => {
    let messageBody = {
      content: this.state.outgoing,
      receiver_id: this.props.item
        .item_owner,
      sender_id: 2,
      item_id: this.props.item.id,
      buy: this.state.want,
      check_available: this.state.check
    };
    let options = {
      method: 'POST',
      headers: {
        'content-type':
          'application/json'
      },
      body: JSON.stringify(messageBody)
    };

    fetch(
      `${config.API_ENDPOINT}/api/message`,
      options
    )
      .then(rsp => {
        if (!rsp.ok) {
          throw new Error(
            'there was a problem sending a message'
          );
        } else {
          return rsp.json();
        }
      })
      .then(msg => {
        this.setState({
          ...this.state,
          outgoing: '',
          sent: true
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    const {
      item_body,
      item_name,
      owner_name,
      item_owner
    } = this.props.item;
    let message;
    const {
      want,
      check,
      outgoing,
      sent,
      more
    } = this.state;
    if (!check && !want) {
      message = null;
    } else {
      message = (
        <form
          className="forsale__messageBox"
          onSubmit={e => {
            e.preventDefault();
            this.handlePostMessage(e);
          }}
        >
          <textarea
            name="outgoing"
            className="forsale__message"
            placeholder={
              sent
                ? `You sent a message to ${owner_name}! Want to send another?`
                : 'tell them how bad you want it ...'
            }
            value={outgoing}
            onChange={e => {
              this.setState({
                ...this.state,
                outgoing: e.target.value
              });
            }}
          ></textarea>
          <button
            type="submit"
            className="forsale__submit"
          >
            SEND
          </button>
        </form>
      );
    }
    return (
      <div className="forsale__item">
        <div className="forsale__actionsAndName">
          <div className="forsale__name">
            {item_name}
          </div>{' '}
          <button
            type="button"
            className="forsale__wantToggle"
            onClick={e =>
              this.setState({
                ...this.state,
                want: !want
              })
            }
            style={{
              background: want
                ? 'yellow'
                : 'gray'
            }}
          >
            {'available?'}
          </button>
          <button
            type="button"
            className="forsale__checkToggle"
            onClick={e =>
              this.setState({
                ...this.state,
                check: !check
              })
            }
            style={{
              background: check
                ? 'yellow'
                : 'gray'
            }}
          >
            {'Want!'}
          </button>
        </div>

        <div
          className="forsale__about"
          style={{
            borderRadius:
              !want && !check
                ? window.innerWidth >
                  720
                  ? 'inherit'
                  : '0 0 4px 4px'
                : window.innerWidth <=
                  720
                ? '4px 4px 0 0 '
                : '4px 0 0 4px'
          }}
        >
          {' '}
          <div className="forsale__owner">
            {'user/ '} {owner_name}
          </div>
          <p
            className="forsale__abvdesc"
            style={{
              height: more
                ? 'max-content'
                : ''
            }}
          >
            {item_body}

            {/* maybe make it so that there isn't as more... button when there is a small amount of text */}
          </p>
          <button
            type="button"
            className="forsale__seeMore"
            onClick={e => {
              this.setState({
                ...this.state,
                more: !this.state.more
              });
              console.log(more);
            }}
          >
            {more
              ? '...less'
              : ' more...'}
          </button>
        </div>
        <>{message}</>
      </div>
    );
  }
}

const ForsaleItemWithModal = giveAModalTo(
  ForsaleItem
);
export default ForsaleItemWithModal;
