import React, {
  Component
} from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.scss';

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    let menu;
    if (!this.state.open) {
      menu = null;
    } else {
      menu = (
        <ul className="Nav__list">
          {[
            {
              destination: '/inventory',
              name: 'Your Inventory'
            },
            {
              destination: '/messages',
              name: 'Messages'
            },
            {
              destination: '/',
              name: 'All Listings'
            }
          ].map(route => (
            <li key={route.destination}>
              <NavLink
                className="Nav__link"
                to={route.destination}
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="Nav">
        <button
          type="button"
          onClick={e =>
            this.setState({
              open: !this.state.open
            })
          }
        >
          Menu
        </button>
        {menu}
      </div>
    );
  }
}

export default MainNav;
