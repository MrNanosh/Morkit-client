import React from 'react';

export default React.createContext({
  messages: [],
  inventory: { items: [], lists: [] },
  forsale: [],
  updateList: () => {},
  updateItem: () => {},
  addItem: () => {},
  addList: () => {},
  deleteItem: () => {},
  deleteList: () => {},
  updateMessage: () => {}
});
