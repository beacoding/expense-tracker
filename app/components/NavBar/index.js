import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const NavBar = ({ employee, logout }) => {
  const { id, first_name, last_name } = employee
  return (
    <div>
      <button onClick={ logout }>Logout</button>
    </div>
  )
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

export default NavBar