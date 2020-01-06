import React, {
  Component
} from 'react';
import ApiContext from '../ApiContext';
import InventoryItem from '../InventoryItem/InventoryItem';
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

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  newInventoryItem = () => {
    //TODO: a fetch request for post
    let newItem = {
      item_name:
        'please name your item',
      item_list: this.props.list_number,
      id: 2525 //delete this later and get the info back from the fetch request
    };
    this.context.addItem(newItem); //needs to be asynchronous with fetchfolders

    console.log(this.context);
    return (
      <InventoryItem
        item={newItem}
        key={newItem.id}
      />
    );
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
          <form className="InventoryList InventoryList__nameform">
            <input
              className="InventoryList__name"
              name="list_name"
              value={list_name}
              type="text"
              onChange={
                this.handleChange
              }
              onBlur={e =>
                this.context.updateList(
                  list_name,
                  e.target.value
                )
              }
            />
          </form>
        </div>

        {this.getInventoryItems(
          itemList,
          list_number
        )}
        <button
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
