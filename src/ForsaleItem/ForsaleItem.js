import React from 'react';

function ForsaleItem(props) {
  const {
    item_body,
    item_name,
    item_owner
  } = props.item;

  return (
    <div className="forsale__item">
      <div className="forsale__name">
        {item_name}
      </div>
      <div className="forsale__owner">
        {item_owner}
      </div>
      <div className="forsale__abvdesc">
        {item_body}
      </div>
    </div>
  );
}

export default ForsaleItem;
