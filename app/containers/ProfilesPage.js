import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import ChangePasswordModal from './ChangePasswordModal';
import { modal } from 'react-redux-modal';
import { employeesActions } from '../actions';
import {toastr} from 'react-redux-toastr';
import {toastrHelpers} from '../helpers';
class Profile extends React.Component {

  
  constructor(props) {
    super(props);
    this.showChangePasswordModal = this.showChangePasswordModal.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  showChangePasswordModal() {
    modal.add(ChangePasswordModal, {
    title: 'Change Password',
    size: 'medium', // large, medium or small,
    closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
    hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
    hideCloseButton: false, // (optional) if you don't wanna show the top right close button
    onSubmitFunction: this.changePassword,
    old_password: this.props.employee.password
    });
  }

  changePassword() {
    const { form, employee } = this.props;
    const newPassword = {
      id: employee.id,
      old_password: form.PasswordForm.values.old_password,
      password: form.PasswordForm.values.new_password
    }
    this.props.dispatch(employeesActions.updatePassword(newPassword)).then((res) => {
      if (res.type == "UPDATE_PASSWORD_SUCCESS") {
        modal.clear();
        toastr.removeByType("error")
        toastr.success('Password Changed', 'Your password has been changed.')
       } else {
         toastr.removeByType("error")
         toastr.error("Error Changing Password", "Please double check your current password.", toastrHelpers.getErrorOptions())
       }
    });;
  }

  render() {
    const { employee } = this.props;
    return (
      <div className="claimlist-container">
        <div className="page-header">
          <div className="page-title">
           Profile
          </div>
          <div className="page-route">
            <span className="route-inactive">Home</span>  <span className="route-active"> > Profile</span>
          </div>
        </div>
          
        <div className="profile-container">
          <Panel bsStyle="primary">
            <Panel.Heading>
              <Panel.Title componentClass="h3">{employee.first_name} {employee.last_name}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <table className="table table-user-information">
                <tbody>
                  <tr>
                    <td>Employee ID:</td>
                    <td>{employee.id}</td>
                  </tr>
                  <tr>
                    <td>First Name:</td>
                    <td>{employee.first_name}</td>
                  </tr>
                  <tr>
                    <td>Last Name:</td>
                    <td>{employee.last_name}</td>
                  </tr>
                  <tr>
                    <td>Manager:</td>
                    <td>{employee.manager_name ? employee.manager_name: "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{employee.email}</td>
                  </tr>   
                  <tr>
                    <td>Password:</td>
                    <td><button className="profile-button" onClick={this.showChangePasswordModal}> Change</button></td>
                  </tr>
                </tbody>
              </table>
            </Panel.Body>
          </Panel>
        </div> 
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { authentication, form} = state;
    const { employee } = authentication;
    return {
      employee,
      form
    };
}

export default withRouter(connect(mapStateToProps)(Profile))
