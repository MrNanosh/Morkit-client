import React, {
  Component
} from 'react';

// function InventoryItem(props) {
//   const {
//     id,
//     item_name,
//     item_body,
//     item_owner,
//     owner_name,
//     item_is,
//     item_list
//   } = props.item;

//   return (
//     <div
//       className="InventoryItem InventoryList__item"
//       id={`${id}IL${item_list}IO${item_owner}`}
//     >
//       <div className="InventoryItem__name">
//         {item_name}
//       </div>
//       <div className="InventoryItem__body">
//         {item_body}
//       </div>
//       <div className="InventoryItem__is">
//         {item_is}
//       </div>

//       {/* toggle item status button */}
//     </div>
//   );
// }

// export default InventoryItem;

class InventoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      id,
      item_name,
      item_body,
      item_owner,
      owner_name,
      item_is,
      item_list
    } = this.props.item;
    return (
      <form className="InventoryItem InventoryList__item">
        <input
          className="InventoryItem__name"
          value={item_name}
          type="text"
        />
        <input
          className="InventoryItem__body"
          value={item_body}
          type="text"
        />
        <input
          className="InventoryItem__is"
          value={item_is}
          type="text"
        />
      </form>
    );
  }
}

export default InventoryItem;
