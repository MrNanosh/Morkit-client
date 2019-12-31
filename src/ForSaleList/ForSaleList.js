import React, {
  useContext
} from 'react';
import ApiContext from '../ApiContext';
import './forsale.scss';
import ForsaleItem from '../ForsaleItem/ForsaleItem';

function ForSaleList() {
  const context = useContext(
    ApiContext
  );

  console.log(context);

  return (
    <div className="forsale">
      {/* {getItems(context.forsale)} */}
      {/* <ForsaleItem
        item={context[0]}
      ></ForsaleItem> */}
      {/* {console.log('Hiya')} */}
      {context.forsale.map(item => {
        return (
          <ForsaleItem
            item={item}
          ></ForsaleItem>
        );
      })}
    </div>
  );
}
export default ForSaleList;

// function getItems(itemList) {
//   itemList.map(item => {
//     return (
//       <ForsaleItem
//         item={item}
//       ></ForsaleItem>
//     );
//   });
// }