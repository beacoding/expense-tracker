import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

// User of Manager will involve displaying all the employees of a particular manager and 
// a dropdown with all the list of managers
const UserOfManager = ({ employee, handleStatusChange, employees }) => {
  const {
    id,
    employee_name,
    is_active
  } = employee;

  var status = is_active === 1 ? "Enabled" : "Disabled";
  
  return (
        <tr>
          <td>{id}</td>
          <td>{employee_name}</td>
          <td>{status}</td>
          <td><input placeholder="manager name"/></td>
        </tr>
  );
}

UserOfManager.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    employee_name: PropTypes.string,
    is_active: PropTypes.number.isRequired,
  }).isRequired
}

export default UserOfManager;