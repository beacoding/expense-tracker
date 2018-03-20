import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { employeesActions } from '../actions';
import { Panel } from 'react-bootstrap';
import UsersList from './UsersList';
import { modal } from 'react-redux-modal';
import UserManagementPasswordChangeModal from './UserManagementPasswordChangeModal';
import UserManagementDeleteModal from './UserManagementDeleteModal';
import UserManagementEnableModal from './UserManagementEnableModal';

class ManageUserContainer extends React.Component {
  constructor(props) {
    super(props);

    this.showUserManagementPasswordChangeModal = this.showUserManagementPasswordChangeModal.bind(this);
    this.showUserManagementDeleteUserModal = this.showUserManagementDeleteUserModal.bind(this);
    this.disableUser = this.disableUser.bind(this);
    this.resetPassword = this.resetPassword.bind(this); 
    this.showEnableUserModal = this.showEnableUserModal.bind(this);
    this.enableUser = this.enableUser.bind(this);
  }

  componentDidMount() {
    let employee_id = window.location.pathname.split("/")[3];
    this.props.dispatch(employeesActions.requestEmployee(employee_id));
  }

  showUserManagementPasswordChangeModal(){
    const {user} = this.props;
    modal.add(UserManagementPasswordChangeModal, {
    title: 'Reset Password of ' + user.employee_name,
    size: 'medium', // large, medium or small,
    closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
    hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
    hideCloseButton: false, // (optional) if you don't wanna show the top right close button
    onSubmitFunction: this.resetPassword
    });
  }

  showUserManagementDeleteUserModal(){
    modal.add(UserManagementDeleteModal, {
    title: 'Disable User',
    size: 'medium', // large, medium or small,
    closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
    hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
    hideCloseButton: false, // (optional) if you don't wanna show the top right close button
    user: this.props.user,
    affirmativeAction: this.disableUser,
    negativeAction: this.clearInputs,            
    });
  }

  showEnableUserModal() {
    modal.add(UserManagementEnableModal, {
    title: 'Enable User',
    size: 'medium', // large, medium or small,
    closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
    hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
    hideCloseButton: false, // (optional) if you don't wanna show the top right close button
    user: this.props.user,
    affirmativeAction: this.enableUser,
    negativeAction: this.clearInputs,            
    });
  }

  disableUser() {
    const user = this.props.user;
    this.props.dispatch(employeesActions.disableEmployee(user.id, user.manager_id)).then(() => {
      modal.clear();
    });
  }

  enableUser() {
    const user = this.props.user;
    this.props.dispatch(employeesActions.enableEmployee(user.id)).then(() => {
      modal.clear();
    });
  }

  resetPassword(){
    const{form, user} = this.props;
    let employee_id = window.location.pathname.split("/")[3];
    const newpassword = {
      id: parseInt(employee_id),
      password: form.ResetPasswordForm.values.new_password
    }

    this.props.dispatch(employeesActions.updatePassword(newpassword)).then(() => {
      modal.clear();
    });
  }

  renderActionsDisabled() {
    return (
      <tr>
        <td><button className="page-button-blue" onClick={this.showEnableUserModal}> Enable User</button></td>
      </tr>
      )
  }

  renderActionsEnabled() {
    return (
      <tr>
        <td><button className="page-button-blue" onClick={this.showUserManagementPasswordChangeModal}> Reset Password</button></td>
        <td><button className="page-button-red" onClick={this.showUserManagementDeleteUserModal}> Disable User </button></td>
      </tr>
      )
  }

  render() {
    const { employee, user } = this.props;
    if (user !== null) {

      return (
        <div>
          <div className="page-header">
            <div className="page-title">
             Edit User
            </div>
            <div className="page-route">
              <span className="route-inactive">Home > Admin</span>  <span className="route-active"> > User Management </span>
            </div>
          </div>
          <div className="profile-container">
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">{user.employee_name}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <strong>Info</strong>
                <table className="table table-user-information">
                  <tbody>
                    <tr>
                      <td>Employee ID:</td>
                      <td>{user.id}</td>
                    </tr>
                    <tr>
                      <td>First Name:</td>
                      <td>{user.first_name}</td>
                    </tr>
                    <tr>
                      <td>Last Name:</td>
                      <td>{user.last_name}</td>
                    </tr>
                    <tr>
                      <td>Manager:</td>
                      <td>{user.manager_name}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{user.email}</td>
                    </tr>   
                  </tbody>
                </table>
                <br/>
                {user.is_active == 1 ? this.renderActionsEnabled() : this.renderActionsDisabled()}
              </Panel.Body>
            </Panel>
          </div>
        </div>
        )
      } else {
        return (<div></div>)
      }
  }
}



function mapStateToProps(state) {
  const { authentication, employees, form } = state;
  const { employee } = authentication;
  const user = employees.current_employee;
  return{
    employee,
    user,
    form
  };
}

export default withRouter(connect(mapStateToProps)(ManageUserContainer))

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


