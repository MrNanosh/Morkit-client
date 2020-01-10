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

Allowed fields for a post. Only senders can post.
buy and check_available are boolean values. They are not
required but are recommended by the design philosophy of Morkit.

```
      {
        content,
        receiver_id [required],
        sender_id [required],
        item_id [required],
        buy,
        check_available
      };
```

#### PATCH api/message/:message_id

`:message_id` must be specified and the resource must exist to make PATCH otherwise
a 404 error is returned.

The design of the message api restricts conversations to single messages.
Messages are atypical of the average and should be thought of as a tray of
paperwork regarding items. Messages are like slips containing requests regarding
items and the response should be noted on the same slip as if it were an invoice.
This design choice was implemented to minimize the use of Morkit as a messaging
service.

allowable fields for a patch are intended for the receiver of the message:

```
      {
        rsp_buy,
        rsp_time,
        rsp_check,
        rsp_both,
        rsp_content
      }
```

#### DELETE api/message/:message_id

Deletes the message and sends a 204

### GET api/forsale

Only get requests.

The forsale part of the api is a special get request created for the purpose of
getting all of the items that are for sale and not just the inventory for a single user as with `/api/inventory`.

`/api/forsale/:item_id` is permitted but DELETE, POST, PATCH and PUT are not.

### api/inventory

Interface for managing inventory items for an authorized user.

#### GET api/inventory

gets all of the inventory items for a single user. Example of response body below.

#### GET api/inventory/:item_id

Gets an inventory item for a specified `:item_id`

```
{
    "id": 1003,
    "item_name": "Putin's item name",
    "item_body": "",
    "item_is": "unavailable",
    "item_list": 1000,
    "item_owner": 2,
    "owner_name": "Putin"
}
```

#### POST api/inventory

Posts a new inventory item

```
      {
        item_name [required],
        item_body [required], //an empty string is allowed
        item_is [required],
        item_list [required], //required by database
        item_owner
      }
```

#### PATCH api/inventory/:item_id

Patches item_name, item_body, or item_is fields.
`item_is` must be either: 'unavailable', 'selling', 'buying', 'fulfilled

#### DELETE api/inventory/:item_id

## Screenshots

![image](https://user-images.githubusercontent.com/32424238/72172454-07590780-338a-11ea-808a-103f7b80dfb8.png)

![image](https://user-images.githubusercontent.com/32424238/72182926-6b3afa80-33a1-11ea-8705-f8b0bf015a35.png)

## Technology

Uses React on the front end using Sass to keep styles organized with the BEM method. The backend uses
a Postgresql relational database connected to a server through knex (knexjs.organized). The server uses
express to route traffic.

```

```
