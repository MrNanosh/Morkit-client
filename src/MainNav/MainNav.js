import React, {
  Component
} from 'react';
import { NavLink } from 'react-router-dom';

class MainNav extends Component {
  render() {
    const key = 0;
    return (
      <div className="Nav">
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
            <li key={key + 1}>
              <NavLink
                className="Nav__link"
                to={route.destination}
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MainNav;
