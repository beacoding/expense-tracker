
// const NewClaimModal = ({ title, size, closeOnOutsideClick, hideTitleBar, hideCloseButton, submitForm, dismissModal }) => {
//     // const { employee, handleSubmit, pristine, reset, submitting } = this.props;
//     let pristine = false;
//     let submitting = false;
//     let reset = false;


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form';
import  NewItemForm  from './NewItemForm';


class NewClaimItemModal extends React.Component {
    constructor(props) {
    super(props);

      console.log('## MODAL DATA AND PROPS:', this.props);
    
    //  this.submitNewClaim = this.submitNewClaim.bind(this);
    }
   
    removeThisModal() {
      this.props.removeModal();
    }
      
  render(){
  
    return (
        <div>
            <NewItemForm form='NewItemForm' onSubmit={this.props.onSubmitItemFunction}/>
        </div>
    );
   }
  }
  

 export default (NewClaimItemModal);