import React from 'react';
import PropTypes from 'prop-types';
import ClaimPage from '../../containers/ClaimPage';
import { Link } from 'react-router-dom';
import './style.css';

const Claim = ({ employee, claim }) => {
  const { id, first_name, last_name, email } = employee
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
      <div><Link to={`/claims/${claim_id}`}>{description}</Link></div>
      <div><small>{date_created}</small></div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Status</th>
            <th scope="col">Approver</th>
            <th scope="col">Cost Centre</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{claim_id}</th>
            <td>{status}</td>
            <td>{approver_first_name + " " + approver_last_name}</td>
            <td>{cost_centre_id}</td>
            <td>{total_amount}</td>
          </tr>
        </tbody>
      </table>
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
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string,
    email: PropTypes.string
  }).isRequired
}

export default Claim;