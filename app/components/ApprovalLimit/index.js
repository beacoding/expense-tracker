import React from 'react';
import PropTypes from 'prop-types';
import ClaimPage from '../../containers/ClaimPage';
import { Link } from 'react-router-dom';

const ApprovalLimit = ({ employee, limit_entry }) => {
  let {
    manager_name,
    employee_id, 
    cost_centre_id,
    approval_limit, 
  } = limit_entry;

  approval_limit = approval_limit === null ? "None" : "$" + approval_limit;
  
  return (
        <tr>
          <td>{employee_id}</td>
          <td>{manager_name}</td>
          <td>{cost_centre_id}</td>
          <td>{approval_limit}</td>
        </tr>
  );
}

ApprovalLimit.propTypes = {
  limit_entry: PropTypes.shape({
    manager_name: PropTypes.string.isRequired,
    employee_id: PropTypes.number.isRequired,
    cost_centre_id: PropTypes.number.isRequired,
    approval_limit: PropTypes.number,
  }).isRequired,
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired
}

export default ApprovalLimit;