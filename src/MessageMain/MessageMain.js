import React, {
  Component
} from 'react';
import ApiContext from '../ApiContext';
import Message from '../Message/Message';
class MessageMain extends Component {
  static contextType = ApiContext;

  getMessages = messages => {
    return messages.map(message => {
      return (
        <Message
          key={message.id}
          message={message}
        ></Message>
      );
    });
  };
  render() {
    return (
      <div className="MessageMain">
        {this.getMessages(
          this.context.messages
        )}
      </div>
    );
  }
}

export default MessageMain;
