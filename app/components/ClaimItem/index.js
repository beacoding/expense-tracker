import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ClaimItem = ({ employee, claim_item }) => {
  const {
    claim_item_id,
    description, 
    amount,
    comment, 
    expense_category,
    image_url,
  } = claim_item;

  let receipt = claim_item.image_url === null ? "No Receipt" : <img className="receipt-img" src={'/uploads/' + image_url}/> 
  
  return (
        <tr>
          <td>{description}</td>
          <td>${amount.toFixed(2)}</td>
          <td>{expense_category}</td>
          <td>{receipt}</td>
        </tr>
  );
}

ClaimItem.propTypes = {
  claim_item: PropTypes.shape({
    claim_item_id: PropTypes.number.isRequired,
    description: PropTypes.string,
    amount: PropTypes.number.isRequired,
    comment: PropTypes.string,
    expense_category: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired
}

export default ClaimItem;