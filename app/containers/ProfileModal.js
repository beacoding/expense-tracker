import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form';
import  PasswordForm  from './PasswordForm';


class ProfileModal extends React.Component {
  constructor(props) {
  super(props);
  }

  removeThisModal() {
    this.props.removeModal();
  }

  render() {

    return (
      <div>
        
          <PasswordForm old_password = {this.props.old_password} onSubmit={this.props.onSubmitFunction}/>
      </div>
    );
   }

  }
  
 export default (ProfileModal);