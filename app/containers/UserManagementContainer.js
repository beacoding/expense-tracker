import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { employeesActions } from '../actions';
import UsersList from './UsersList';

class UserMangementContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleParamChangeText = this.handleParamChangeText.bind(this);
  }

  handleStatusChange(employee_id) {
    this.props.dispatch(employeesActions.requestEmployees(employee_id));
  }

  componentWillReceiveProps(nextprops) {
    this.props.dispatch(employeesActions.requestWith(nextprops.params))
  }


  handleParamChangeText(e) {
    var value = e.target.value.length > 0 ? e.target.value : null
    var param_to_change = e.target.name;
    this.props.dispatch(employeesActions.modifyParams(param_to_change, value));
  }

  renderSearchByEmployeeOrManager() {
    return (
      <div className="approval-limits-filter-row">
        <div className="approval-limits-search"><h4>Filter By:</h4></div>
        <div className="form-group approval-limits-search">
          <input type="text" className="form-control" name="employee_name" id="reports-search-manager" placeholder="Employee Name" onChange={this.handleParamChangeText}/>
        </div>
        <div className="form-group approval-limits-search">
          <input type="text" className="form-control" name="cost_centre_id" id="reports-search-employee" placeholder="Manager Name" onChange={this.handleParamChangeText}/>
        </div>
      </div>
      )
  }


  render() {
    const { employee, users } = this.props;
    return (
      <div>
      <div className="page-header">
        <div className="page-title">
         User Management
        </div>
        <div className="page-route">
          <span className="route-inactive">Home > Admin</span>  <span className="route-active"> > User Management </span>
        </div>
      </div>
      {this.renderSearchByEmployeeOrManager()}
      <div className="claimlist-container">
        <UsersList handleStatusChange={this.handleStatusChange}/>
      </div>
      </div>
    )
  }
}



function mapStateToProps(state) {
  const { authentication } = state;
  const { employee } = authentication;
  return{
    employee
  };
}

export default withRouter(connect(mapStateToProps)(UserMangementContainer))

// User Management

// Display Users
//   - Table/Grid
//     - Name, Email, Manager, Status�   - Each entry has a button to open user page
//   - User Page
//     - Display all user info again, pre-populate inputs
//     - Dynamic managers list dropdown
//     - Reset Password → modal requesting new password
//     - Save button

// Disable User
//   - accessed via User Page
//   - check for employees under selected account → auto set to selected account’s manager
//   - check for S/F claims under selected account → auto F to selected account’s manager
//   - delete any un-submitted claims
//   - action success returns user to User Page (now indicating deactivated)


