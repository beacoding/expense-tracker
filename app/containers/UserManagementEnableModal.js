import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form';
import  ResetPasswordForm  from './ResetPasswordForm';


class UserManagementEnableModal extends React.Component {
  constructor(props) {
  super(props);
  }

  removeThisModal() {
    this.props.removeModal();
  }

  render() {

    return (
      <div>
        <p>Are you sure you want to enable <strong>{this.props.user.employee_name}'s</strong> account?</p>
        <div className="modal-buttons-container">
           <button className="page-button-red" onClick={this.props.negativeAction}>No</button>
           <button className="page-button-green" onClick={this.props.affirmativeAction}>Yes</button>
        </div>
      </div>
    );
   }

  }
  
 export default (UserManagementEnableModal);