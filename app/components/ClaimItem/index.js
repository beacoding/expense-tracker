import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ClaimItem = ({ claimItem }) => {
  const {
    id,
    manager_first_name, 
    manager_last_name,
    manager_email,
    description, 
    amount, 
    comment, 
    expense_type,
    image_url,
    has_receipt
  } = claimItem;
  return (
    <div>
      <button onClick={ logout }>Logout</button>
    </div>
  )
}

ClaimItem.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    manager_first_name: PropTypes.string.isRequired,
    manager_last_name: PropTypes.string.isRequired,
    manager_email: PropTypes.string.isRequired,
    description: PropTypes.string,
    amount: PropTypes.number.isRequired,
    comment: PropTypes.string,
    expense_type: PropTypes.string,
    image_url: PropTypes.string,
    has_receipt: PropTypes.bool.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
}

export default ClaimItem