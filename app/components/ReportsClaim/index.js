import React from 'react';
import PropTypes from 'prop-types';
import ClaimPage from '../../containers/ClaimPage';
import { Link } from 'react-router-dom';
import { claimsHelpers } from  '../../helpers';

import './style.css';

const ReportsClaim = ({ employee, claim }) => {
  const { id, first_name, last_name, email } = employee
  const {
    claim_id,
    claimee_first_name,
    claimee_last_name,
    approver_first_name,
    approver_last_name,
    company_name,
    cost_centre_id,
    description,
    account_number,
    notes,
    status,
    date_created,
    total_amount,
    manager_first_name,
    manager_last_name,
    manager_email
  } = claim;

  return (
    <div className="claim-container">
      <div className="claim-description"><Link to={`/claims/${claim_id}`}>{description}</Link></div>
      <div><small className="claim-date">{claimsHelpers.toDateString(date_created)}</small></div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Claimee</th>
            <th scope="col">Approver</th>
            <th scope="col">Manager</th>
            <th scope="col">Cost Centre</th>
            <th scope="col">Total (CAD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{claimsHelpers.getStatusText(status)}</td>
            <td>{claimee_first_name + " " + claimee_last_name}</td>
            <td>{approver_first_name + " " + approver_last_name}</td>
            <td>{manager_first_name + " " + manager_last_name}</td>
            <td>{cost_centre_id}</td>
            <td>{"$" + total_amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

ReportsClaim.propTypes = {
  claim: PropTypes.shape({
    claim_id: PropTypes.number.isRequired,
    claimee_first_name: PropTypes.string.isRequired,
    claimee_last_name: PropTypes.string.isRequired,
    approver_first_name: PropTypes.string.isRequired,
    approver_last_name: PropTypes.string.isRequired,
    manager_first_name: PropTypes.string.isRequired,
    manager_last_name: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    cost_centre_id: PropTypes.number.isRequired,
    description: PropTypes.string,
    notes: PropTypes.string,
    account_number: PropTypes.string,
    status: PropTypes.string.isRequired,
    date_created: PropTypes.string.isRequired,
  }).isRequired,
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string,
    email: PropTypes.string
  }).isRequired
}

export default ReportsClaim;