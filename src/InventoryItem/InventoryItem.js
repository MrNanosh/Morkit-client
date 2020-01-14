import React, {
  Component
} from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import './InventoryItem.scss';
class InventoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.item };
  }
  static contextType = ApiContext;

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  deleteItem = e => {
    const item_id = e.target.id;

    const options = {
      method: 'DELETE',
      headers: {
        'content-type':
          'application/json'
      }
    };
    fetch(
      `${config.API_ENDPOINT}/api/inventory/${item_id}`,
      options
    )
      .then(rsp => {
        if (!rsp.ok) {
          throw new Error(rsp);
        } else {
          return rsp;
        }
      })
      .then(rsp => {
        this.context.deleteItem(
          item_id
        );
        console.log(
          `deleted item ${item_id}`,
          this.context.inventory.items
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateItemFields = itemFields => {
    const itemBody = {
      [itemFields.name]:
        itemFields.value
    };
    const options = {
      method: 'PATCH',
      headers: {
        'content-type':
          'application/json'
      },
      body: JSON.stringify(itemBody)
    };
    fetch(
      `${config.API_ENDPOINT}/api/inventory/${this.state.id}`,
      options
    )
      .then(rsp => {
        if (!rsp.ok) {
          throw new Error(rsp);
        } else {
          return rsp;
        }
      })
      .then(rsp => {
        this.context.updateItem(
          this.state.id,
          itemFields
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {
      id,
      item_name,
      item_body,
      item_owner,
      owner_name,
      item_is,
      item_list
    } = this.state;
    return (
      <form className="InventoryItem InventoryList__item">
        <input
          className="InventoryItem__name"
          name="item_name"
          value={item_name}
          type="text"
          onChange={this.handleChange}
          onBlur={e => {
            this.updateItemFields(
              e.target
            );
          }}
        />
        <textarea
          className="InventoryItem__body"
          value={item_body}
          name="item_body"
          type="text"
          onChange={this.handleChange}
          onBlur={e => {
            this.updateItemFields(
              e.target
            );
          }}
        />
        <select
          className="InventoryItem__is"
          className="InventoryItem__is"
          value={item_is}
          name="item_is"
          type="text"
          onChange={this.handleChange}
          onBlur={e => {
            this.updateItemFields(
              e.target
            );
          }}
        >
          <option value="unavailable">
            unavailable
          </option>
          <option value="selling">
            selling
          </option>
          <option value="buying">
            buying
          </option>
          <option value="fulfilled">
            fulfilled
          </option>
        </select>
        <button
          type="button"
          onClick={e =>
            this.deleteItem(e)
          }
          id={id}
        >
          delete item
        </button>
      </form>
    );
  }
}

export default InventoryItem;
