import React from 'react';

export default React.createContext({
  messages: [],
  inventory: { items: [], lists: [] },
  forsale: [],
  updateItem: () => {}
});
