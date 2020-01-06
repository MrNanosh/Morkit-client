import React, {
  Component
} from 'react';
import ApiContext from '../ApiContext';

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
    this.state = { ...this.props.item };
  }
  static contextType = ApiContext;

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      id,
      item_name,
      item_body,
      item_owner,
      owner_name,
      item_is,
      item_list
    } = this.state;
    return (
      <form className="InventoryItem InventoryList__item">
        <input
          className="InventoryItem__name"
          name="item_name"
          value={item_name}
          type="text"
          onChange={this.handleChange}
          onBlur={e =>
            this.context.updateItem(
              id,
              e.target.value
            )
          }
        />
        <textarea
          className="InventoryItem__body"
          value={item_body}
          name="item_body"
          type="text"
          onChange={this.handleChange}
          onBlur={e =>
            this.context.updateItem(
              id,
              e.target.value
            )
          }
        />
        <input
          className="InventoryItem__is"
          value={item_is}
          name="item_is"
          type="text"
          onChange={this.handleChange}
          onBlur={e =>
            this.context.updateItem(
              id,
              e.target.value
            )
          }
        />
      </form>
    );
  }
}

export default InventoryItem;
