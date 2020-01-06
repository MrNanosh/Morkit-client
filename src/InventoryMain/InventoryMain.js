import React, {
  Component
} from 'react';
import ApiContext from '../ApiContext';
import InventoryList from '../InventoryList/InventoryList';
import config from '../config';

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
      list_name: 'please name your List'
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type':
          'application/json'
      },
      body: JSON.stringify(newList)
    };

    fetch(
      `${config.API_ENDPOINT}/api/list`,
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
      .then(list => {
        this.context.addList(list); //needs to be asynchronous with fetchfolders
        this.props.history.push(
          '/inventory'
        );
        console.log(list);
        // return (
        //   <InventoryList
        //     list_name={json.list_name}
        //     list_number={json.id}
        //     key={json.id}
        //   />
        // );
      })
      .catch(error =>
        console.log(
          'something went wrong'
        )
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
