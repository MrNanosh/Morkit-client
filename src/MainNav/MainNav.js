import React, {
  Component
} from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    let menu;
    let menuIcon;
    if (!this.state.open) {
      menu = null;
      menuIcon = (
        <FontAwesomeIcon icon="chevron-circle-right" />
      );
    } else {
      menuIcon = (
        <FontAwesomeIcon icon="chevron-circle-down" />
      );
      menu = (
        <ul className="Nav__list">
          {[
            {
              destination: '/inventory',
              name: 'Your Inventory',
              icon: 'boxes'
            },
            {
              destination: '/messages',
              name: 'Messages',
              icon: 'inbox'
            },
            {
              destination: '/',
              name: 'All Listings',
              icon: 'list-alt'
            }
          ].map(route => (
            <li key={route.destination}>
              <NavLink
                className="Nav__link"
                to={route.destination}
              >
                <FontAwesomeIcon
                  icon={route.icon}
                />
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
          {menuIcon}
        </button>
        {menu}
      </div>
    );
  }
}

export default MainNav;
