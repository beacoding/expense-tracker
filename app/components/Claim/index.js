import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Claim = ({ employee, claim }) => {
  const { employee_id, employee_first_name, employee_last_name, employee_email } = employee
  const {
    claim_id,
    approver_first_name,
    approver_last_name,
    company_name,
    cost_centre_id,
    description,
    account_number,
    notes,
    status,
    date_created,
    total_amount
  } = claim;
  return (
    <div>
    </div>
  );
}

Claim.propTypes = {
  claim: PropTypes.shape({
    claim_id: PropTypes.number.isRequired,
    approver_first_name: PropTypes.string.isRequired,
    approver_last_name: PropTypes.string.isRequired,
    approver_last_name: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    cost_centre_id: PropTypes.number.isRequired,
    description: PropTypes.string,
    notes: PropTypes.string,
    account_number: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    date_created: PropTypes.string.isRequired,
  }).isRequired,
  employee: PropTypes.shape({
    employee_id: PropTypes.number.isRequired,
    employee_first_name: PropTypes.string.isRequired,
    employee_last_name: PropTypes.string,
    employee_email: PropTypes.string
  }).isRequired
}

export default Claim;