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
      )
    ])
      .then(
        ([
          messageRes,
          inventoryRes,
          forsaleRes
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

          return Promise.all([
            messageRes.json(),
            inventoryRes.json(),
            forsaleRes.json()
          ]);
        }
      )
      .then(
        ([
          messages,
          inventory,
          forsale
        ]) => {
          this.setState({
            messages,
            inventory,
            forsale
          });
        }
      )
      .catch(error => {
        console.error({ error });
      });
  }

  handleAddItem = item => {
    this.setState({
      folders: [
        ...this.state.inventory,
        item
      ]
    });
  };

  handleAddMessage = message => {
    this.setState({
      notes: [
        ...this.state.notes,
        message
      ]
    });
  };

  handleDeleteItem = itemId => {
    console.log(
      this.state.inventory[0].id,
      itemId
    );
    this.setState({
      notes: this.state.inventory.filter(
        item => item.id !== itemId
      )
    });
  };

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
      forsale: this.state.forsale
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
