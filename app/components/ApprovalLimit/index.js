import React from 'react';
import PropTypes from 'prop-types';
import ClaimPage from '../../containers/ClaimPage';
import { Link } from 'react-router-dom';
import InlineEdit from 'react-edit-inline';

const ApprovalLimit = ({ employee, limit_entry, handleEditLimit }) => {
  let {
    manager_name,
    employee_id, 
    cost_centre_id,
    approval_limit, 
  } = limit_entry;

  let dollar_sign = "$"

  if (approval_limit === null) {
    approval_limit = "None"
    dollar_sign = ""
  }
  
  return (
        <tr>
          <td>{employee_id}</td>
          <td>{manager_name}</td>
          <td>{cost_centre_id}</td>
          <td>{dollar_sign}<InlineEdit paramName="new_approval_limit" change={handleEditLimit.bind(this, employee_id, cost_centre_id )} text= {approval_limit} />  <i className="ion-edit"></i></td>
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