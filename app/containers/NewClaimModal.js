import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form';
import  NewClaimForm  from './NewClaimForm';


class NewClaimModal extends React.Component {
  constructor(props) {
  super(props);
  }

  removeThisModal() {
    this.props.removeModal();
  }
    
  render() {
    return (
      <div>
          <NewClaimForm cost_centres={this.props.cost_centres} companies={this.props.companies} form='NewClaimForm' onSubmit={this.props.onSubmitFunction}/>
      </div>
    );
   }
  }
  
 export default (NewClaimModal);