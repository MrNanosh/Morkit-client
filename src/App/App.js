import React, {
  Component
} from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import '../main.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';
import ForSaleList from '../ForSaleList/ForSaleList';
import InventoryMain from '../InventoryMain/InventoryMain';
import MessageMain from '../MessageMain/MessageMain';
import MainNav from '../MainNav/MainNav';
import HelpText from '../HelpText/HelpText';
// import ErrorBoundary from '../ErrorBoundary';

class App extends Component {
  state = {
    inventory: { items: [], lists: [] },
    messages: [],
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
            messages,
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
    this.setState({
      notes: this.state.messages.filter(
        message =>
          message.id !== messageId
      )
    });
  };

  handleUpdateMessage = (
    messageId,
    fieldsToUpdate
  ) => {
    const messageIndex = this.state.messages.findIndex(
      item =>
        item.id === Number(messageId)
    );
    let updatedMessage = this.state
      .messages[messageIndex];
    updatedMessage = {
      ...updatedMessage,
      ...fieldsToUpdate
    };
    let listOfMessages = this.state
      .messages;
    listOfMessages.splice(
      messageIndex,
      1,
      updatedMessage
    );

    this.setState({
      ...this.state,
      messages: listOfMessages
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

  renderNavRoutes() {
    return (
      <>
        {[
          '/',
          '/inventory',
          '/messages'
        ].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={MainNav}
          />
        ))}
      </>
    );
  }

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
      deleteList: this.handleDeleteList,
      updateMessage: this
        .handleUpdateMessage
    };
    return (
      <ApiContext.Provider
        value={value}
      >
        <div className="App">
          <header className="App__header">
            <h1>
              <Link to="/">Morkit</Link>{' '}
              <FontAwesomeIcon icon="bread-slice" />
            </h1>
            <HelpText></HelpText>
            <nav className="App__nav">
              {this.renderNavRoutes()}
            </nav>
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
