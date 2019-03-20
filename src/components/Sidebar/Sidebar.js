import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SidebarOptions from './sidebarOptions';
import { closeMenu, openMenu } from '../../redux/store/UI/UI';
import { getAuthDirectly } from '../../services/localStorage';

const rolesControll = roles => {
  const { email } = getAuthDirectly();
  if (!roles) {
    return true;
  }
  return roles.includes(email);
};

class Sidebar extends React.Component {
  toggleMenuHandler = event => {
    const { menuIsOpen, dispatch } = this.props;
    dispatch(menuIsOpen ? closeMenu() : openMenu());
    event.preventDefault();
  };

  render() {
    const { theme, menuIsOpen } = this.props;
    const sidebarClassName = `sidebar overflow-hidden-x overflow-scroll-y sidebar-${theme} ${
      menuIsOpen ? 'sidebar-open-menu' : 'sidebar-close-menu'
    } `;
    return (
      <div id='sidebar' className={sidebarClassName}>
        <nav>
          <ul>
            <li className='sidebar-item'>
              <a
                onClick={this.toggleMenuHandler}
                className={`custom-button-${theme}`}
                href='/'
              >
                <div className='d-flex'>
                  <i
                    className={`fas fa-arrow-${
                      menuIsOpen ? 'left' : 'right'
                    } sidebar-icon`}
                  />
                </div>
              </a>
            </li>
            {SidebarOptions.map((sidebar, index) => {
              const { icon, name, to, roles } = sidebar;
              if (rolesControll(roles)) {
                return (
                  <li key={index} className='sidebar-item'>
                    <NavLink
                      className={`custom-button-${theme}`}
                      exact
                      isActive={(match, location) => location.pathname === to}
                      activeClassName='actived'
                      to={to}
                    >
                      <div className='d-flex'>
                        <i className={`${icon} sidebar-icon`} />
                        <p className='fs-7 white-nowrap'>{name}</p>
                      </div>
                    </NavLink>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ UI }, props) => {
  return {
    ...UI,
    ...props
  };
};

export default connect(mapStateToProps)(Sidebar);
