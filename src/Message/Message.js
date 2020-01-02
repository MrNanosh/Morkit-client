import React, {
  Component
} from 'react';
import config from '../config';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message
    };
    //     id,
    // sender_name,
    // sender_id,
    // receiver_id,
    // receiver_name,
    // item_id,
    // item_name,
    // send_time,
    // content,
    // buy,
    // check_available,
    // rsp_buy,
    // rsp_check,
    // rsp_both,
    // rsp_content
    // rsp_time
  }

  handleSendMessage = () => {
    const rsp_time = new Date();
    const bodyContent = {
      ...this.state.message,
      rsp_time
    };
    const options = {
      method: 'PUT',
      headers: {
        'content-type':
          'application/json'
      },
      body: JSON.stringify(bodyContent)
    };

    const messageId = ''; //use for the patch request
    // fetch here to patch message with response
    fetch(
      config.API_ENDPOINT +
        '/api/message/' +
        messageId,
      options
    )
      .then(rsp => {
        // make sure it comes back with an ok response
        // if it's ok then set the state for messages using context
      })
      .then(rsp => {})
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
          <input
            type="radio"
            value="yes"
            name={option}
          />
          yes
          <input
            type="radio"
            value="no"
            name={option}
          />
          no
          <input
            type="radio"
            value="maybe"
            name={option}
            checked
          />
          maybe{' '}
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
        <p className="Message_content">
          {content}
        </p>
        <form
          action="submit"
          className="Message__response"
          onSubmit={e => {
            e.preventDefault();
            this.handleSendMessage();
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
