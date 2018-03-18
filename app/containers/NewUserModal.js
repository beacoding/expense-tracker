import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form';
import  NewUserForm  from './NewUserForm';


class NewUserModal extends React.Component {
  constructor(props) {
    super(props);
  }

  removeThisModal() {
    this.props.removeModal();
  }
    
  render() {
    return (
      <div>
        <NewUserForm employees={this.props.employees} form='NewUserForm' onSubmit={this.props.onSubmitFunction}/>
      </div>
    );
   }
  }
  
 export default (NewUserModal);