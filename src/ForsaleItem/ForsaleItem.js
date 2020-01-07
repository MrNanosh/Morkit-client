import giveAModalTo from '../HOCS/hasModal';
import React, {
  Component
} from 'react';

class ForsaleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      want: false,
      check: false
    };
  }

  render() {
    const {
      item_body,
      item_name,
      owner_name,
      item_owner
    } = this.props.item;

    return (
      <div className="forsale__item">
        <div className="forsale__actionsAndName">
          <div className="forsale__name">
            {item_name}
          </div>{' '}
          <button
            type="button"
            className="forsale__checkToggle"
          >
            {'available?'}
          </button>
          <button
            type="button"
            className="forsale__checkToggle"
          >
            {'Want!'}
          </button>
        </div>

        <div className="forsale__about">
          {' '}
          <div className="forsale__owner">
            {'user/ '} {owner_name}
          </div>
          <div className="forsale__abvdesc">
            {item_body}

            {/* maybe make it so that there isn't as more... button when there is a small amount of text */}
          </div>
          <button
            type="button"
            className="forsale__seeMore"
          >
            more...
          </button>
        </div>
      </div>
    );
  }
}

// export default ForsaleItem;
// function ForsaleItem(props) {
//   const {
//     item_body,
//     item_name,
//     owner_name,
//     item_owner
//   } = props.item;

//   return (
//     <div className="forsale__item">
//       <div className="forsale__actionsAndName">
//         <div className="forsale__name">
//           {item_name}
//         </div>{' '}
//         <button
//           type="button"
//           className="forsale__checkToggle"
//         >
//           {'available?'}
//         </button>
//         <button
//           type="button"
//           className="forsale__checkToggle"
//         >
//           {'Want!'}
//         </button>
//       </div>

//       <div className="forsale__about">
//         {' '}
//         <div className="forsale__owner">
//           {'user/ '} {owner_name}
//         </div>
//         <div className="forsale__abvdesc">
//           {item_body}

//           {/* maybe make it so that there isn't as more... button when there is a small amount of text */}
//         </div>
//         <button
//           type="button"
//           className="forsale__seeMore"
//         >
//           more...
//         </button>
//       </div>
//     </div>
//   );
// }

const ForsaleItemWithModal = giveAModalTo(
  ForsaleItem
);
export default ForsaleItemWithModal;
