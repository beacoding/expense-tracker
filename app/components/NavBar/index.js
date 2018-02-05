import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './navstyle.css';

const NavBar = ({ employee, logout }) => {
  const { id, first_name, last_name, email } = employee;
  const location = window.location.pathname;
  return (<div>
            <div className="logo">
                <h3>Coast Capital</h3>
            </div>
            <ul className="list-unstyled components" >
                <li className="active"><Link to="/"><i className="ion-android-list"></i>My Claims</Link></li>
                <li><Link to="/approvals"><i className="ion-android-time"></i>Approvals</Link></li>
                <li><a href="#"><i className="ion-android-checkmark-circle"></i>Reporting</a></li>
                <li><a href="#"><i className="ion-android-contacts"></i>Users</a></li>
                <li><a href="#"><i className="ion-android-options"></i>Approval Limits</a></li>
                <li><a href="#"><i className="ion-gear-b"></i>Settings</a></li>
                <li style={{cursor: "pointer"}} onClick={logout}><a>Logout</a></li>
            </ul>
            </div>
  );
}

NavBar.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  logout: PropTypes.func.isRequired
}

export default NavBar;
