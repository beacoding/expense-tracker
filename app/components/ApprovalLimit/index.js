import React from 'react';
import PropTypes from 'prop-types';
import ClaimPage from '../../containers/ClaimPage';
import { Link } from 'react-router-dom';
import { RIEInput, RIETextArea, RIENumber } from 'riek'

const ApprovalLimit = ({ employee, limit_entry, handleEditLimit, handleDeleteLimit }) => {
  let {
    manager_name,
    employee_id, 
    cost_centre_id,
    approval_limit, 
  } = limit_entry;

  let dollar_sign = '';

  if (approval_limit !== null) {
    approval_limit = approval_limit.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    dollar_sign = "$";
  } else {
    approval_limit = "No Limit";
  }

  if (manager_name === undefined) {
    manager_name = "Loading...";
    employee_id = "Loading...";
    cost_centre_id = "Loading...";
    approval_limit = "Loading...";    
  }

  let isLimitInputAcceptable = (limitInput) => {
    var floatRegex = /^[0-9]*\.?[0-9]+|^$/;
    return floatRegex.test(limitInput);
  };
  
  return (
    <tr>
      <td>{manager_name}</td>
      <td>{cost_centre_id}</td>
      <td>{dollar_sign}<RIEInput value={approval_limit} change={handleEditLimit.bind(this, employee_id, cost_centre_id)} propName='new_approval_limit' validate={isLimitInputAcceptable} />  <i className="ion-edit"></i></td>
      <td><i className="ion-close-circled pointer" style={{fontSize: 18 + 'px'}} onClick={handleDeleteLimit.bind(this, employee_id, cost_centre_id)}></i></td>
    </tr>
  );
}

ApprovalLimit.propTypes = {
  limit_entry: PropTypes.shape({
    manager_name: PropTypes.string,
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