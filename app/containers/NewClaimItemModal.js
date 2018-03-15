
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form';
import  NewClaimItemForm  from './NewClaimItemForm';


class NewClaimItemModal extends React.Component {
  constructor(props) {
    super(props);
  }
  
  removeThisModal() {
    this.props.removeModal();
  }
  
  render() {
    return (
      <div>
        <NewClaimItemForm initialValues={this.props.currentValues} form='NewClaimItemForm' onSubmit={this.props.onSubmitFunction}/>
      </div>
    );
  }
}

export default (NewClaimItemModal);
