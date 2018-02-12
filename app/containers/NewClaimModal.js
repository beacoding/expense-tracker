
// const NewClaimModal = ({ title, size, closeOnOutsideClick, hideTitleBar, hideCloseButton, submitForm, dismissModal }) => {
//     // const { employee, handleSubmit, pristine, reset, submitting } = this.props;
//     let pristine = false;
//     let submitting = false;
//     let reset = false;


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form';
import  NewClaimForm  from './NewClaimForm';


class NewClaimModal extends React.Component {
    constructor(props) {
    super(props);
      console.log('## MODAL DATA AND PROPS:', this.props);
    //  this.submitNewClaim = this.submitNewClaim.bind(this);
    }
  

//   submitNewClaim(){

//     // const formData = {};
//     // for (const field in this.refs){
//     //   formData[field] = this.refs[field].value;
//     // }

//     debugger;
//     this.props.dispatch(claimsActions.addClaim(formData));
//   }

    removeThisModal() {
      this.props.removeModal();
    }
      
  render(){
  
    return (
        <div>
            <NewClaimForm form='NewClaimForm' onSubmit={this.props.onSubmitFunction}/>
        </div>
    );
   }
  }
  
//   function mapStateToProps(state) {
//     const { formdata} = form;
//     const { employee } = authentication;
//   }
 export default (NewClaimModal);