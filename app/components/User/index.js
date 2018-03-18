import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import './style.css';

const User = ({ user, handleStatusChange }) => {
  const {
    id,
    employee_name,
    manager_name,
    is_active
  } = user;

  var status = is_active === 1 ? "Active" : "Disabled";
  
  return (
        <tr>
          <td>{id}</td>
          <td>{employee_name}</td>
          <td>{manager_name}</td>
          <td>{status}</td>
          <td name="user"> <NavLink to={"/admin/users/"+ id}> <i className="ion-edit"></i></NavLink></td>
        </tr>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    employee_name: PropTypes.string,
    manager_name: PropTypes.string,
    is_active: PropTypes.number.isRequired,
  }).isRequired
}

export default User;