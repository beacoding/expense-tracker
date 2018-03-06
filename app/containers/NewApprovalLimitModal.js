import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form';
import  NewApprovalLimitForm  from './NewApprovalLimitForm';


class NewApprovalLimitModal extends React.Component {
  constructor(props) {
    super(props);
  }

  removeThisModal() {
    this.props.removeModal();
  }
    
  render() {
    return (
      <div>
          <NewApprovalLimitForm employees={this.props.employees} cost_centres={this.props.cost_centres} form='NewApprovalLimitForm' onSubmit={this.props.onSubmitFunction}/>
      </div>
    );
   }
  }
  
 export default (NewApprovalLimitModal);