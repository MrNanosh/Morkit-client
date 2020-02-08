import React, {
  Component
} from 'react';
import config from '../config';
import './Message.scss';
import { formatDistance } from 'date-fns';
import ApiContext from '../ApiContext';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        ...this.props.message,
        [this.props.message.buy &&
        !this.props.message
          .check_available
          ? 'rsp_buy'
          : this.props.message
              .check_available &&
            !this.props.message.buy
          ? 'rsp_check'
          : 'rsp_both']: 'maybe'
      },

      responded: false,
      showForm: false
    };
  }
  static contextType = ApiContext;

  handleSendMessage = () => {
    const rsp_time = new Date();
    const bodyContent = {
      ...this.state.message,
      rsp_time
    };
    const options = {
      method: 'PATCH',
      headers: {
        'content-type':
          'application/json'
      },
      body: JSON.stringify(bodyContent)
    };

    const messageId = this.state.message
      .id; //use for the patch request
    // fetch here to patch message with response
    fetch(
      config.API_ENDPOINT +
        '/api/message/' +
        messageId,
      options
    )
      .then(rsp => {
        // make sure it comes back with an ok response
        if (!rsp.ok) {
          throw new Error(
            'something went wrong when you tried to respond to the message'
          );
        } else {
          return rsp;
        }
        // if it's ok then set the state for messages using context
      })
      .then(async rsp => {
        let patchedMessage = await fetch(
          rsp.url
        );
        if (!patchedMessage.ok) {
          throw new Error(
            'something went wrong when you tried to respond to the message'
          );
        } else {
          return patchedMessage.json();
        }
      })
      .then(message => {
        this.context.updateMessage(
          message.id,
          message
        );
        this.setState({
          ...this.state,
          responded: true
        });
      })
      .catch(error => {});
  };

  makeResponse = () => {
    //checks incoming message for options and only makes a list of those that exist
    const {
      buy,
      check_available
    } = this.state.message;
    return [
      buy &&
        !check_available &&
        'rsp_buy',
      check_available &&
        !buy &&
        'rsp_check',
      check_available &&
        buy &&
        'rsp_both'
    ].map(option => {
      //it only makes radio buttons for options that exist in the message
      return !option ? (
        ''
      ) : (
        <div
          className="Message__options"
          key={option}
        >
          {' '}
          <div className="Message__yes">
            <input
              type="radio"
              value="yes"
              name={option}
            />
            <label htmlFor="yes">
              yes
            </label>
          </div>
          <div className="Message__no">
            <input
              type="radio"
              value="no"
              name={option}
            />
            <label htmlFor="no">
              no
            </label>
          </div>
          <div className="Message__maybe">
            <input
              type="radio"
              value="maybe"
              name={option}
              defaultChecked
            />
            <label htmlFor="maybe">
              maybe
            </label>{' '}
          </div>
        </div>
      );
    });
  };

  renderForm = () => {
    if (this.state.showForm) {
      return (
        <form
          action="submit"
          className="Message__response"
          onSubmit={e => {
            e.preventDefault();
            this.handleSendMessage();
          }}
          onChange={e => {
            this.setState({
              ...this.state,
              message: {
                ...this.state.message,
                [e.target.name]:
                  e.target.value
              }
            });
          }}
        >
          {this.makeResponse()}
          <textarea
            name="rsp_content"
            id="rsp_content"
            cols="30"
            rows="10"
            placeholder={
              this.state.responded
                ? 'Sent! Change your response?'
                : 'write/change your response'
            }
            className="Message__responseMessage"
          ></textarea>
          <input
            type="submit"
            value={
              this.state.responded
                ? 'edit & send again?'
                : 'send message'
            }
            className="Message__submit"
          />
        </form>
      );
    }
  };

  render() {
    const {
      sender_name,
      item_name,
      send_time,
      content,
      buy,
      check_available,
      rsp_content,
      rsp_check,
      rsp_both,
      rsp_time,
      rsp_buy
    } = this.props.message;
    let response;
    if (
      rsp_buy ||
      rsp_check ||
      rsp_both
    ) {
      response = (
        <p className="Message__content__response">
          <strong>
            {rsp_buy ||
              rsp_check ||
              rsp_both}
            ! -
          </strong>{' '}
          <em className="Message__timestamp">
            {formatDistance(
              new Date(rsp_time),
              new Date()
            ) + ' ago'}
          </em>
          <br />
          {rsp_content}
        </p>
      );
    } else {
      response = null;
    }

    return (
      <div className="MessageMain__message Message">
        <h3 className="Message__header">
          {sender_name} {'wants to '}
          {buy && check_available
            ? 'check availability with the intent to buy'
            : buy
            ? 'buy'
            : 'check the availability of'}
        </h3>
        <strong className="Message__item">
          {item_name}
        </strong>
        <em className="Message__timestamp">
          {formatDistance(
            new Date(send_time),
            new Date()
          ) + ' ago'}
        </em>
        <p className="Message__content">
          {content}
        </p>
        {response}
        {this.renderForm()}
        <button
          className="Message__expand"
          type="button"
          onClick={e =>
            this.setState({
              ...this.state,
              showForm: !this.state
                .showForm
            })
          }
        >
          {this.state.showForm
            ? 'close'
            : 'respond'}
        </button>
      </div>
    );
  }
}

export default Message;
