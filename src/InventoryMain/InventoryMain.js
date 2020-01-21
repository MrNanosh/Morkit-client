import React, {
  Component
} from 'react';
import ApiContext from '../ApiContext';
import InventoryList from '../InventoryList/InventoryList';
import config from '../config';
import './InventoryMain.scss';

class InventoryMain extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.newList = React.createRef();
    this.focusNewList = this.focusNewList.bind(
      this
    );
  }
  focusNewList() {
    this.newList.current.focus();
  }

  getLists = inventoryLists => {
    return inventoryLists.map(list => {
      return (
        <InventoryList
          key={list.id}
          list_number={list.id}
          list_name={list.list_name}
          // show_delete={this.setState({
          //   ...this.state
          // })}
        ></InventoryList>
      );
    });
  };

  newInventoryList = () => {
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
          className="InventoryMain__newListButton"
          aria-label={'new list'}
          onClick={e => {
            this.focusNewList();
            this.newInventoryList();
          }}
        >
          <span>+</span>
        </button>
        <input
          type="button"
          visibility="hidden"
          style={{ background: 'none' }}
          className="InventoryMain__newListArea"
          ref={this.newList}
        ></input>
      </div>
    );
  }
}

export default InventoryMain;
