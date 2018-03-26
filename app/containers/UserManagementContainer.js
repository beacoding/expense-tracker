import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { modal } from 'react-redux-modal';
import { toastr } from 'react-redux-toastr';
import { employeesActions } from '../actions';
import { toastrHelpers } from '../helpers';
import UsersList from './UsersList';
import NewUserModal from './NewUserModal';
import ModalContainer from './ModalContainer';
import UserManagementPasswordChangeModal from './UserManagementPasswordChangeModal';

class UserManagementContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleAdmin = this.handleToggleAdmin.bind(this);
    this.handleManagerChange = this.handleManagerChange.bind(this);    
    this.handleParamChangeText = this.handleParamChangeText.bind(this);
    
    this.addUser = this.addUser.bind(this);
    this.enableUser = this.enableUser.bind(this);
    this.disableUser = this.disableUser.bind(this);
    this.resetPassword = this.resetPassword.bind(this); 
    
    this.showNewUserModal = this.showNewUserModal.bind(this);
    this.showEnableUserModal = this.showEnableUserModal.bind(this);
    this.showDisableUserModal = this.showDisableUserModal.bind(this);
    this.showPasswordResetModal = this.showPasswordResetModal.bind(this)
  }
  
  componentWillMount() {
    this.props.dispatch(employeesActions.requestAll())
  }
  
  componentWillReceiveProps(nextprops) {
    if (this.props.params !== nextprops.params) {
      this.props.dispatch(employeesActions.requestWith(nextprops.params));
    }
  }
  
  render() {
    const { employee } = this.props;
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
        <div className="approval-limits-filter-container">
          <div className="approval-limits-filter-row">
            <div className="approval-limits-search"><label>Filter by Employee:</label></div>
            <div className="form-group approval-limits-search">
              <input type="text" className="form-control" name="employee_name" id="reports-search-manager" placeholder="First or Last Name" onChange={this.handleParamChangeText}/>
            </div>
            <div className="approval-limits-search"><label>or Employee's Manager:</label></div>
            <div className="form-group approval-limits-search">
              <input type="text" className="form-control" name="cost_centre_id" id="reports-search-employee" placeholder="First or Last Name" onChange={this.handleParamChangeText}/>
            </div>
            <div className="approval-limits-button">
              <div className="padded-buttons-row">
                <button className="page-button" onClick={this.showNewUserModal}> New User </button>
              </div>
            </div>
          </div>
        </div>       
        <UsersList
          handleManagerChange={this.handleManagerChange}
          handleToggleAdmin={this.handleToggleAdmin}
          showEnableUserModal={this.showEnableUserModal}
          showDisableUserModal={this.showDisableUserModal}
          showPasswordResetModal={this.showPasswordResetModal}
          />
      </div>
    )
  }

  handleToggleAdmin(user) {
    modal.add(ModalContainer, {
      title: 'Toggle Privileges',
      bodyHtml: `
        <p>Are you sure you want to toggle System Administrator privileges for <strong>` + user.employee_name + `</strong>?</p>           
      `,
      size: 'medium',
      hideCloseButton: true,
      affirmativeAction: () => {
        this.props.dispatch(employeesActions.toggleAdmin(user.id)).then((res) => {
          modal.clear();
          toastr.removeByType("error")
          toastr.success("Privileges Toggled", `System Administrator privileges for ` + user.employee_name + ` have been toggled.`)
        });
      },
      affirmativeText: 'Yes',
      negativeText: 'No'
    });
  }

  handleManagerChange(employee, selection) {
    if (!selection) {
      selection = {};
      selection.label = "N/A";
      selection.value = null;
    }
    this.props.dispatch(employeesActions.assignManager(employee.id, selection.value)).then((res) => {
      if (res.type === "ASSIGN_MANAGER_SUCCESS") {
        toastr.removeByType("error");
        if (selection.label == "N/A") {
          toastr.success('Manager Removed', employee.manager_name + ' has been removed as ' + employee.employee_name + "'s manager.");          
        } else {
          toastr.success('Manager Updated', selection.label + ' has been successfully set as ' + employee.employee_name + "'s manager.");
        }
        modal.clear();
      } else if (res.error != null) {
        toastr.removeByType("error");
        toastr.error(res.error.error, "Could not assign " + selection.label + ' as ' + employee.employee_name + "'s manager.");
      } else {
        toastr.removeByType("error");
        toastr.error('Error Updating Manager', 'Please try again.', toastrHelpers.getErrorOptions())
      }      
    });
  }

  handleParamChangeText(e) {
    var value = e.target.value.length > 0 ? e.target.value : null
    var param_to_change = e.target.name;
    this.props.dispatch(employeesActions.modifyParams(param_to_change, value));
  }

  addUser(data) {
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
        toastr.success('Employee Added', data.first_name + ' ' + data.last_name  + ' has been successfully added');
        modal.clear();
      } else if (res.error != null) {
        toastr.removeByType("error");
        toastr.error(res.error.error, "Could not add " + data.first_name + ' ' + data.last_name + ".");
      } else if (res.error.error.sqlMessage && res.error.error.sqlMessage.indexOf("Out of range") >= 0) {
        toastr.removeByType("error");
        toastr.error('Error Adding Employee', "ID cannot be longer than 11 digits.", toastrHelpers.getErrorOptions())
      } else {
        toastr.removeByType("error");
        toastr.error('Error Adding Employee', res.error.error, toastrHelpers.getErrorOptions())
      }      
    });;
  }

  showNewUserModal() {
    modal.add(NewUserModal, {
      title: 'Create New User',
      size: 'medium', // large, medium or small,
      closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
      hideCloseButton: false, // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;)
      onSubmitFunction: this.addUser,
      employees: this.props.users
    });
  }

  enableUser(user) {
    this.props.dispatch(employeesActions.enableEmployee(user.id)).then(() => {
      modal.clear();
      toastr.removeByType("error")
      toastr.success("User Enabled", user.employee_name + "'s account has been enabled.")
    });
  }

  showEnableUserModal(user) {
    modal.add(ModalContainer, {
      title: 'Enable User',
      bodyHtml: `
        <p>Are you sure you want to enable <strong>` + user.employee_name + `'s</strong> account?</p>           
      `,
      size: 'medium',
      hideCloseButton: true,
      affirmativeAction: this.enableUser.bind(this, user),
      affirmativeText: 'Yes',
      negativeText: 'No'
    });
  }

  disableUser(user) {
    this.props.dispatch(employeesActions.disableEmployee(user.id, user.manager_id)).then(() => {
      modal.clear();
      toastr.removeByType("error")
      toastr.warning("User Disabled", user.employee_name + "'s account has been disabled.")
    });
  }

  showDisableUserModal(user) {
    modal.add(ModalContainer, {
      title: 'Disable User',
      bodyHtml: `
        <p>Are you sure you want to disable <strong>` + user.employee_name + `'s</strong> account?</p>
        <p>All the employees under this manager will be moved to their supervisor <strong>` + user.manager_name + `.</strong></p>          
      `,
      size: 'medium',
      hideCloseButton: true,
      affirmativeAction: this.disableUser.bind(this, user),
      affirmativeText: 'Yes',
      negativeText: 'No'
    });
  }

  resetPassword(user) {
    const { form } = this.props;
    let employee_id = user.id;
    const newPassword = {
      id: parseInt(employee_id),
      password: form.ResetPasswordForm.values.new_password
    }
    this.props.dispatch(employeesActions.resetPassword(newPassword)).then((res) => {
      if (res.type == "RESET_PASSWORD_SUCCESS") {
        modal.clear();
        toastr.removeByType("error");
        toastr.success('Password Successfully Reset', 'Password for ' + user.employee_name + ' has been changed.')
       } else {
         toastr.removeByType("error");
         toastr.error("Error Resetting Password", "Please try again.", toastrHelpers.getErrorOptions())
       }
    });
  }

  showPasswordResetModal(user) {
    modal.add(UserManagementPasswordChangeModal, {
    title: 'Reset Password of ' + user.employee_name,
    size: 'medium', // large, medium or small,
    closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
    hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
    hideCloseButton: false, // (optional) if you don't wanna show the top right close button
    onSubmitFunction: this.resetPassword.bind(this, user)
    });
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


