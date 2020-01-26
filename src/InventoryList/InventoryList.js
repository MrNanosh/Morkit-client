import React, {
  Component
} from 'react';
import ApiContext from '../ApiContext';
import InventoryItem from '../InventoryItem/InventoryItem';
import config from '../config';
import './InventoryList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props };
  }
  static contextType = ApiContext;

  getInventoryItems = (
    itemList,
    listNumber
  ) => {
    return itemList
      .filter(
        item =>
          item.item_list === listNumber
      )
      .map(item => {
        return (
          <InventoryItem
            item={item}
            key={item.id}
          ></InventoryItem>
        );
      });
  };

  updateListFields = listFields => {
    const listBody = {
      [listFields.name]:
        listFields.value
    };
    const options = {
      method: 'PATCH',
      headers: {
        'content-type':
          'application/json'
      },
      body: JSON.stringify(listBody)
    };
    fetch(
      `${config.API_ENDPOINT}/api/list/${this.state.list_number}`,
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
        this.context.updateList(
          this.state.list_number,
          listFields
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  deleteList = e => {
    const list_id = e.target.id;

    const options = {
      method: 'DELETE',
      headers: {
        'content-type':
          'application/json'
      }
    };
    fetch(
      `${config.API_ENDPOINT}/api/list/${list_id}`,
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
        this.context.deleteList(
          list_id
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  newInventoryItem = () => {
    //TODO: a fetch request for post
    let newItem = {
      item_name:
        'please name your item',
      item_list: this.props.list_number,
      item_is: 'unavailable'
    };
    const options = {
      method: 'POST',
      headers: {
        'content-type':
          'application/json'
      },
      body: JSON.stringify(newItem)
    };

    fetch(
      `${config.API_ENDPOINT}/api/inventory`,
      options
    )
      .then(rsp => {
        if (!rsp.ok) {
          throw new Error(
            'something went wrong'
          );
        } else {
          return rsp.json();
        }
      })
      .then(item => {
        this.context.addItem(item); //needs to be asynchronous with fetchfolders
        // this.props.history.push(
        //   '/inventory'
        // );
        console.log(item);
      })
      .catch(e => console.log(e));

    // console.log(this.context);
    // return (
    //   <InventoryItem
    //     item={newItem}
    //     key={newItem.id}
    //   />
    // );
  };

  render() {
    const { inventory } = this.context;
    const itemList = inventory.items;

    const {
      list_number,
      list_name
    } = this.state;

    return (
      <div className="InventoryList">
        <div className="InventoryList__name">
          <form
            className="InventoryList__nameform"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input
              className="InventoryList__nameInput"
              name="list_name"
              value={list_name}
              type="text"
              onChange={
                this.handleChange
              }
              onBlur={e =>
                this.updateListFields(
                  e.target
                )
              }
            />
          </form>
          <button
            type="button"
            id={list_number}
            className="InventoryList__delete"
            aria-label={'delete List'}
            onClick={e =>
              this.deleteList(e)
            }
          >
            <span className="InventoryList__delete__hover">
              delete list{' '}
            </span>
            <FontAwesomeIcon
              className="InventoryList__delete__icon"
              icon="trash-alt"
            />
          </button>
        </div>

        {this.getInventoryItems(
          itemList,
          list_number
        )}
        <button
          type="button"
          className="InventoryList__newItemButton"
          onClick={
            this.newInventoryItem
          }
        >
          + New Item +
        </button>
        {/* button must create a new */}
      </div>
    );
  }
}

export default InventoryList;
