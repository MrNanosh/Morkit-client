import React, {
  Component
} from 'react';
import ApiContext from '../ApiContext';
import InventoryItem from '../InventoryItem/InventoryItem';
class InventoryList extends Component {
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

  render() {
    console.log(this.context);
    const { inventory } = this.context;
    const itemList = inventory.items;

    const {
      listNumber,
      listName
    } = this.props;

    return (
      <div className="InventoryList">
        <div className="InventoryList__name">
          {listName}
        </div>
        {this.getInventoryItems(
          itemList,
          listNumber
        )}

        {/*needs some sort of add item button*/}
      </div>
    );
  }
}

export default InventoryList;
