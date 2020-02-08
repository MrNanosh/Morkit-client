import React, {
  useContext
} from 'react';
import ApiContext from '../ApiContext';
import './forsale.scss';
import ForsaleItem from '../ForsaleItem/ForsaleItem';
import giveAModalTo from '../HOCS/HasModal';
import ForsaleItemWithModal from '../ForsaleItem/ForsaleItem';

function ForSaleList() {
  const context = useContext(
    ApiContext
  );

  return (
    <div className="forsale">
      {getItems(context.forsale)}
    </div>
  );
}
export default ForSaleList;

function getItems(itemList) {
  return itemList.map(item => {
    return (
      <ForsaleItemWithModal
        key={item.id}
        item={item}
      ></ForsaleItemWithModal>
    );
  });
}
