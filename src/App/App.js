import React, {
  Component
} from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';
import ForSaleList from '../ForSaleList/ForSaleList';
import InventoryMain from '../InventoryMain/InventoryMain';
import MessageMain from '../MessageMain/MessageMain';
// import ErrorBoundary from '../ErrorBoundary';

class App extends Component {
  state = {
    inventory: { items: [], lists: [] },
    messages: {
      in: [],
      out: {
        inquiries: [],
        responses: []
      }
    },
    forsale: []
  };

  componentDidMount() {
    Promise.all([
      fetch(
        `${config.API_ENDPOINT}/api/message`
      ),
      fetch(
        `${config.API_ENDPOINT}/api/inventory`
      ),
      fetch(
        `${config.API_ENDPOINT}/api/forsale`
      ),
      fetch(
        `${config.API_ENDPOINT}/api/list`
      )
    ])
      .then(
        ([
          messageRes,
          inventoryRes,
          forsaleRes,
          listRes
        ]) => {
          if (!messageRes.ok)
            return messageRes
              .json()
              .then(e =>
                Promise.reject(e)
              );
          if (!inventoryRes.ok)
            return inventoryRes
              .json()
              .then(e =>
                Promise.reject(e)
              );
          if (!forsaleRes.ok)
            return forsaleRes
              .json()
              .then(e =>
                Promise.reject(e)
              );
          if (!listRes.ok)
            return listRes
              .json()
              .then(e =>
                Promise.reject(e)
              );

          return Promise.all([
            messageRes.json(),
            inventoryRes.json(),
            forsaleRes.json(),
            listRes.json()
          ]);
        }
      )
      .then(
        ([
          messages,
          inventory,
          forsale,
          list
        ]) => {
          forsale.sort(
            (a, b) => b.id - a.id
          );
          messages.sort(
            (a, b) => b.id - a.id
          );
          this.setState({
            messages: {
              // in: messages.filter()
            },
            inventory: {
              items: inventory.sort(
                (a, b) => a.id - b.id
              ),
              lists: list.sort(
                (a, b) => a.id - b.id
              )
            },
            forsale
          });
        }
      )
      .catch(error => {
        console.error({ error });
      });
  }

  handleAddItem = item => {
    //TODO:needs auth
    this.setState({
      inventory: {
        items: [
          ...this.state.inventory.items,
          item
        ],
        lists: this.state.inventory
          .lists
      }
    });
  };

  handleAddList = list => {
    //TODO:needs auth
    this.setState({
      inventory: {
        items: this.state.inventory
          .items,

        lists: [
          ...this.state.inventory.lists,
          list
        ]
      }
    });
  };

  handleAddMessage = message => {
    this.setState({
      notes: [
        ...this.state.messages,
        message
      ]
    });
  };

  handleDeleteItem = itemId => {
    this.setState({
      inventory: {
        ...this.state.inventory,
        items: this.state.inventory.items.filter(
          item =>
            item.id !== Number(itemId)
        )
      }
    });
    console.log(this.state);
  };

  handleDeleteList = listId => {
    this.setState({
      inventory: {
        ...this.state.inventory,
        lists: this.state.inventory.lists.filter(
          list =>
            list.id !== Number(listId)
        )
      }
    });
  };

  handleDeleteMessage = messageId => {
    console.log(
      this.state.messages[0].id,
      messageId
    );
    this.setState({
      notes: this.state.messages.filter(
        message =>
          message.id !== messageId
      )
    });
  };

  handleUpdateItem = (
    itemId,
    fieldsToUpdate
  ) => {
    const itemIndex = this.state.inventory.items.findIndex(
      item => item.id === Number(itemId)
    );
    let updatedItem = this.state
      .inventory.items[itemIndex];
    let field = {
      [fieldsToUpdate.name]:
        fieldsToUpdate.value
    };
    updatedItem = {
      ...updatedItem,
      ...field
    };
    console.log(updatedItem);
    let listOfItems = this.state
      .inventory.items;
    listOfItems.splice(
      itemIndex,
      1,
      updatedItem
    );
    this.setState({
      inventory: {
        ...this.state.inventory,
        items: listOfItems
      }
    });
  };

  handleUpdateList = (
    listId,
    fieldsToUpdate
  ) => {
    const listIndex = this.state.inventory.lists.findIndex(
      list => list.id === Number(listId)
    );
    let updatedList = this.state
      .inventory.lists[listIndex];
    let field = {
      [fieldsToUpdate.name]:
        fieldsToUpdate.value
    };
    updatedList = {
      ...updatedList,
      ...field
    };
    let listOfLists = this.state
      .inventory.lists;
    listOfLists.splice(
      listIndex,
      1,
      updatedList
    );
    this.setState({
      inventory: {
        ...this.state.inventory,
        lists: listOfLists
      }
    });
  };

  //TODO: nav routes
  // renderNavRoutes() {
  //   return (
  //     <>
  //       {['/', '/inventory/:itemId'].map(
  //         path => (
  //           <Route
  //             exact
  //             key={path}
  //             path={path}
  //             component={}
  //           />
  //         )
  //       )}
  //       <Route
  //         path="/message/:messageId"
  //         component={}
  //       />
  //       <Route
  //         path="/message/"
  //         component={}
  //       />
  //       <Route
  //         path="/add-item"
  //         component={}
  //       />
  //       <Route
  //         path="/ask"
  //         component={}
  //       />
  //     </>
  //   );
  // }

  renderMainRoutes() {
    return (
      <>
        {[
          {
            endpoint: '/',
            mainView: ForSaleList
          },
          {
            endpoint: '/inventory',
            mainView: InventoryMain
          },
          {
            endpoint: '/messages',
            mainView: MessageMain
          }
        ].map(path => (
          <Route
            exact
            key={path.endpoint}
            path={path.endpoint}
            component={path.mainView}
          />
        ))}
      </>
    );
  }

  render() {
    const value = {
      inventory: this.state.inventory,
      messages: this.state.messages,
      forsale: this.state.forsale,
      updateItem: this.handleUpdateItem,
      updateList: this.handleUpdateList,
      addItem: this.handleAddItem,
      addList: this.handleAddList,
      deleteItem: this.handleDeleteItem,
      deleteList: this.handleDeleteList
    };
    return (
      <ApiContext.Provider
        value={value}
      >
        <div className="App">
          {/* <nav className="App__nav">
              {this.renderNavRoutes()}
            </nav> */}
          <header className="App__header">
            <h1>
              <Link to="/">Morkit</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">
            {this.renderMainRoutes()}
          </main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
