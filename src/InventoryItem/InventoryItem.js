import React from 'react';

function InventoryItem(props) {
  const {
    id,
    item_name,
    item_body,
    item_owner,
    item_is,
    item_list
  } = props.item;
  return (
    <div
      className="InventoryItem InventoryList__item"
      id={`${id}IL${item_list}IO${item_owner}`}
    >
      <div className="InventoryItem__name">
        {item_name}
      </div>
      <div className="InventoryItem__body">
        {item_body}
      </div>
      <div className="InventoryItem__is">
        {item_is}
      </div>

      {/* toggle item status button */}
    </div>
  );
}

export default InventoryItem;
