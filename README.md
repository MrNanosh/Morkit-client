# Morkit - a social market place for regular people

## Summary of features

Morkit was designed to aid normal people in making
sales. Users can click a button to check the availability
or to ask to purchase an item another user has posted.
Managing Inventory is as simple as clicking and editing
a spreadsheet. Items that are brand new will show up on the
splash page and users can ask the owner if it is available
or just generally express their interest in the item.
Users can manage their messages at /messages where they can
respond to individual messages. Messages are not seen as
conversations since the app treats messages as individual
inquiries. Think of Messages as requests for buying and
checking availability only.

## Check out the LIVE version

https://morkit.now.sh

## API documentation

### api/message

#### GET api/message/

gets all messages sent by an authorized user.
Example of a message can be seen under next header.

#### GET api/message/:id

example of output

```
{
    "id": 1,
    "content": "Hey",
    "sender_id": 2,
    "receiver_id": 5,
    "item_id": 2,
    "send_time": "2020-01-02T22:19:36.870Z",
    "buy": true,
    "check_available": false,
    "rsp_buy": "yes",
    "rsp_time": "2020-01-08T19:07:28.426Z",
    "rsp_check": null,
    "rsp_both": null,
    "rsp_content": "you can def have it\n",
    "receiver_name": "Gary",
    "sender_name": "Putin",
    "receiver_fullname": "Gary",
    "sender_fullname": "Donald J trump",
    "item_name": "milenium falcon"
}
```

#### POST api/message

allowed fiends for a post. Only senders can post.
buy and check_available are boolean values. They are not
required but are recommended by the design philosophy of Morkit.

```
      {
        content,
        receiver_id,
        sender_id,
        item_id,
        buy,
        check_available
      };
```

#### PATCH api/message

### api/forsale

only get requests

### api/inventory

## Screenshots

![image](https://user-images.githubusercontent.com/32424238/72172454-07590780-338a-11ea-808a-103f7b80dfb8.png)

## Technology

Uses React on the front end using Sass to keep styles organized with the BEM method. The backend uses
a Postgresql relational database connected to a server through knex (knexjs.organized). The server uses
express to route traffic.
