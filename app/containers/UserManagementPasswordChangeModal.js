import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form';
import  ResetPasswordForm  from './ResetPasswordForm';


class UserManagementPasswordChangeModal extends React.Component {
  constructor(props) {
  super(props);
  }

  removeThisModal() {
    this.props.removeModal();
  }

  render() {

    return (
      <div>
          <ResetPasswordForm onSubmit={this.props.onSubmitFunction}/>
      </div>
    );
   }

  }
  
 export default (UserManagementPasswordChangeModal);