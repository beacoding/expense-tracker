import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const NavBar = ({ employee, logout }) => {
  const { employee_id, employee_first_name, employee_last_name, employee_email } = employee;
  return (
    <div>
      <button onClick={ logout }>Logout</button>
    </div>
  )
}

NavBar.propTypes = {
  employee: PropTypes.shape({
    employee_id: PropTypes.number.isRequired,
    employee_first_name: PropTypes.string.isRequired,
    employee_last_name: PropTypes.string,
    employee_email: PropTypes.string
  }).isRequired,
  logout: PropTypes.func.isRequired
}

export default NavBar;