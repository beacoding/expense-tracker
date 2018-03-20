import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { employeesActions } from '../actions';
import UsersList from './UsersList';
import NewUserModal from './NewUserModal';
import { Field, reduxForm } from 'redux-form';
import { modal } from 'react-redux-modal';
import {toastr} from 'react-redux-toastr';
import {toastrHelpers} from '../helpers';


class UserManagementContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleParamChangeText = this.handleParamChangeText.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.showNewUserModal = this.showNewUserModal.bind(this);
  }

  handleStatusChange(employee_id) {
    // loads employees to allow for disabling
    this.props.dispatch(employeesActions.requestEmployees(employee_id));
  }

  componentDidMount() {
    this.props.dispatch(employeesActions.requestAll())
  }

  componentWillReceiveProps(nextprops) {
    this.props.dispatch(employeesActions.requestWith(nextprops.params));
  }

  handleParamChangeText(e) {
    var value = e.target.value.length > 0 ? e.target.value : null
    var param_to_change = e.target.name;
    this.props.dispatch(employeesActions.modifyParams(param_to_change, value));
  }

  handleAddUser(data) {
    const { employee, form } = this.props;
    const newUser = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      manager_id: form.NewUserForm.values.manager_id.value,
      is_admin: (data.is_admin === true),      
    }
    this.props.dispatch(employeesActions.addEmployee(newUser)).then((res) => {
      if (res.type === "ADD_EMPLOYEE_SUCCESS") {
        toastr.removeByType("error");
        .claim);
        toastr.success(data.first_name + ' ' + data.last_name  + ' has been successfully added');
      } else {
        toastr.removeByType("error");
        toastr.error(data.first_name + ' ' + data.last_name  + ' has been not added', 'Please try again', toastrHelpers.getErrorOptions())
      }
      modal.clear();
    });;
  }

  showNewUserModal(){
    modal.add(NewUserModal, {
      title: 'Create New User',
      size: 'medium', // large, medium or small,
      closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
      hideCloseButton: false, // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;)
      onSubmitFunction: this.handleAddUser,
      employees: this.props.users
    });
  }

  renderSearchByEmployeeOrManager() {
    return (
      <div className="approval-limits-filter-container">
        <div className="approval-limits-filter-row">
          <div className="approval-limits-search"><label>Filter by Employee:</label></div>
          <div className="form-group approval-limits-search">
            <input type="text" className="form-control" name="employee_name" id="reports-search-manager" placeholder="Employee Name" onChange={this.handleParamChangeText}/>
          </div>
          <div className="approval-limits-search"><label>or Employee's Manager:</label></div>
          <div className="form-group approval-limits-search">
            <input type="text" className="form-control" name="cost_centre_id" id="reports-search-employee" placeholder="Manager Name" onChange={this.handleParamChangeText}/>
          </div>
        </div>
      </div>
    )
  }

  renderButtons() {
    return (
      <div className="padded-buttons-row">
        <button className="page-button" onClick={this.showNewUserModal}> New User </button>
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
        {this.renderButtons()}
        <UsersList handleStatusChange={this.handleStatusChange}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication, form, employees } = state;
  const { employee } = authentication;
  const users = employees.employees;
  const params = employees.params;
  return {
    employee,
    users,
    form,
    params
  };
}

export default withRouter(connect(mapStateToProps)(UserManagementContainer))

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


