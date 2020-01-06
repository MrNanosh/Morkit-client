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
          list_number={list.id}
          list_name={list.list_name}
        ></InventoryList>
      );
    });
  };

  newInventoryList = () => {
    //TODO: a fetch request for post
    let newList = {
      list_name:
        'please name your List',
      id: 2525 //delete this later and get the info back from the fetch request
    };
    this.context.addList(newList); //needs to be asynchronous with fetchfolders

    console.log(this.context);
    return (
      <InventoryList
        item={newList}
        key={newList.id}
      />
    );
  };

  render() {
    return (
      <div className="InventoryMain">
        {this.getLists(
          this.context.inventory.lists
        )}
        <button
          onClick={
            this.newInventoryList
          }
        >
          + New Inventory List +
        </button>
      </div>
    );
  }
}

export default InventoryMain;
