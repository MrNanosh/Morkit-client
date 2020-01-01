import React, {
  Component
} from 'react';
import ApiContext from '../ApiContext';
import InventoryList from '../InventoryList/InventoryList';

class InventoryMain extends Component {
  static contextType = ApiContext;

  getLists = inventoryLists => {
    return inventoryLists.map(list => {
      return (
        <InventoryList
          key={list.id}
          listNumber={list.id}
          listName={list.list_name}
        ></InventoryList>
      );
    });
  };

  render() {
    return (
      <div className="InventoryMain">
        {this.getLists(
          this.context.inventory.lists
        )}
      </div>
    );
  }
}

export default InventoryMain;
