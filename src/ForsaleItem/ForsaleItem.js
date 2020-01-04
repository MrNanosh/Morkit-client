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
        <button className="forsale__seeMore">
          more...
        </button>
        {/* maybe make it so that there isn't as more... button when there is a small amount of text */}
      </div>
      <button className="forsale__checkToggle">
        {'available?'}
      </button>
      <button className="forsale__checkToggle">
        {'Want!'}
      </button>
    </div>
  );
}

export default ForsaleItem;
