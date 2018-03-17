import React from 'react';
import PropTypes from 'prop-types';
import ClaimPage from '../../containers/ClaimPage';
import { Link } from 'react-router-dom';
import { claimsHelpers } from  '../../helpers';

import './style.css';

const PendingClaim = ({ employee, claim, handleAction, hasApprovalAuthority, hasSufficientApprovalLimit }) => {
  const { id, first_name, last_name, email } = employee
  const {
    claim_id,
    claimant_first_name,
    claimant_last_name,
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
    <div className="claim-container">
      <div className="claim-description"><Link to={`/approvals/${claim_id}`}>{description}</Link></div>
      <div><small className="claim-date">{claimsHelpers.toDateString(date_created)}</small></div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Submitted By</th>
            <th scope="col">Total (CAD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{claimant_first_name + " " + claimant_last_name}</td>
            <td>{"$" + total_amount}</td>
          </tr>
        </tbody>
      </table>
      <div className="buttons-row">
        <button className="page-button-red" onClick={handleAction}>Decline</button>
        { (!hasApprovalAuthority || !hasSufficientApprovalLimit) && <button className="page-button-blue" onClick={handleAction}>Forward</button> }
        { hasApprovalAuthority && hasSufficientApprovalLimit && <button className="page-button-green" onClick={handleAction}>Approve</button> }
      </div>
      { (!hasApprovalAuthority || !hasSufficientApprovalLimit) && <div className="approval-authority-row">
        { !hasApprovalAuthority && <div className="approval-authority-msg"><i className="ion-android-alert">You do not currently have approval rights for the cost centre associated with this claim.</i></div> }
        { hasApprovalAuthority && !hasSufficientApprovalLimit && <div className="approval-authority-msg"><i className="ion-android-alert">This claim exceeds your approval limit for this cost centre.</i></div> }
      </div>
      }
    </div>
  );
}

PendingClaim.propTypes = {
  claim: PropTypes.shape({
    claim_id: PropTypes.number.isRequired,
    claimant_first_name: PropTypes.string.isRequired,
    claimant_last_name: PropTypes.string.isRequired,
    claimant_last_name: PropTypes.string.isRequired,
    approver_first_name: PropTypes.string.isRequired,
    approver_last_name: PropTypes.string.isRequired,
    approver_last_name: PropTypes.string.isRequired,
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

export default PendingClaim;