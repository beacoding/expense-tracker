
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form';
import  NewItemForm  from './NewItemForm';


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
        <NewItemForm form='NewItemForm' onSubmit={this.props.onSubmitItemFunction}/>
      </div>
    );
  }
}

export default (NewClaimItemModal);
