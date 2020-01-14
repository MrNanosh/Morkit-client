import React from 'react';
import ReactDOM from 'react-dom';
import Message from '../Message/Message';

describe('InventoryItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(
      <Message
        message={{
          id: 1000,
          content: 'hello',
          sender_id: 2,
          receiver_id: 5,
          item_id: 2,
          send_time:
            '2020-01-04T02:07:48.395Z',
          buy: true,
          check_available: false,
          rsp_buy: 'maybe',
          rsp_time:
            '2020-01-04T02:45:25.935Z',
          rsp_check: null,
          rsp_both: null,
          rsp_content:
            ' hello, back at you',
          receiver_name: 'Gary',
          sender_name: 'Putin',
          receiver_fullname: 'Gary',
          sender_fullname:
            'Donald J trump',
          item_name: 'milenium falcon'
        }}
      />,
      div
    );
  });
});
