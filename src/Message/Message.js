import React, {
  Component
} from 'react';
import config from '../config';
import './Message.scss';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      responded: false
    };
  }

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
      .then(rsp => {
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
        <>
          {' '}
          <div className="Message__yes">
            <input
              type="radio"
              id="yes"
              value="yes"
              name={option}
            />
            <label htmlFor="yes">
              yes
            </label>
          </div>
          <div className="Message__no">
            <input
              id="no"
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
              id="maybe"
              type="radio"
              value="maybe"
              name={option}
              defaultChecked
            />
            <label htmlFor="maybe">
              maybe
            </label>{' '}
          </div>
        </>
      );
    });
  };

  render() {
    const {
      sender_name,
      item_name,
      send_time,
      content,
      buy,
      check_available
    } = this.props.message;

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
          {send_time}
        </em>
        <p className="Message__content">
          {content}
        </p>
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
            className="Message__responseMessage"
          ></textarea>
          <input
            type="submit"
            value="send message"
            className="Message__submit"
          />
        </form>
      </div>
    );
  }
}

export default Message;
