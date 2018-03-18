import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal';
import { claimItemsActions } from '../actions';
import ClaimItem from '../components/ClaimItem'
import ModalContainer from './ModalContainer'
import NewClaimItemModal from './NewClaimItemModal'

class ClaimItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.confirmDeleteItem = this.confirmDeleteItem.bind(this);    
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.editClaimItem = this.editClaimItem.bind(this);
    this.handleChangeExpenseCategory = this.handleChangeExpenseCategory.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleEditReceipt = this.handleEditReceipt.bind(this);
  }

  confirmDeleteItem() {
    const { claim_id, claim_item } = this.props;
    this.props.dispatch(claimItemsActions.deleteClaimItem(claim_id, claim_item.claim_item_id)).then(() => {
      modal.clear();
    });
  }

  isDescriptionValid(description) {
    if (description.trim().length > 0) {
      return true;
    } else {
      return false;
    }
  }

  editClaimItem(data) {
    let claim_id = window.location.pathname.split("/")[2];
    const { employee, form } = this.mapStateToProps;
    let receipt = (data.no_receipt === true) ? null : data.receipt[0];
    const item = {
      claim_id: parseInt(claim_id),
      description: data.description,
      amount: parseFloat(data.amount),
      comment: data.comment,
      expense_type: parseInt(data.expense_type),
      receipt: receipt
    }
    console.log(item);3
    this.props.dispatch(claimItemsActions.editClaimItem(item, )).then(() => {
      modal.clear();
    });;
  }

  // handleEditItem(description) {
  //   const { claim_item } = this.props;
  //   modal.add(NewClaimItemModal, {
  //     title: 'Edit Claim Item',
  //     size: 'medium',
  //     hideCloseButton: true,
  //     currentValues: claim_item,
  //     onSubmitFunction: this.editClaimItem
  //   });
  // }

  handleEditItem(key, claim_item_id, item) {
    let claim_id = parseInt(window.location.pathname.split("/")[2]);
    this.props.dispatch(claimItemsActions.editClaimItem(item, claim_id, claim_item_id));
  }

  handleDeleteItem() {
    modal.add(ModalContainer, {
      title: 'Delete Claim Item?',
      bodyHtml: `
      <p>Are you sure you want to delete this claim item?</p>
      <br/>
      `,
      size: 'medium',
      hideCloseButton: true,
      affirmativeAction: this.confirmDeleteItem,
      affirmativeText: 'Yes',
      negativeText: 'No',
    }); 
  }

  handleChangeExpenseCategory(claim_item_id, e) {
    let claim_id = window.location.pathname.split("/")[2];
    let item = {}
    item.expense_type = e.target.value;
    this.props.dispatch(claimItemsActions.editClaimItem(item, claim_id, claim_item_id));
  }

  handleEditReceipt(claim_item_id, e) {
    let claim_id = window.location.pathname.split("/")[2];
    let item = {};
    item.receipt = e.target.files[0];
    this.props.dispatch(claimItemsActions.editReceipt(item, claim_id, claim_item_id))
  }

  render() {
    const { claim_item, claim_status, employee } = this.props;
    return (
      <ClaimItem  handleEditReceipt={this.handleEditReceipt} handleChangeExpenseCategory={this.handleChangeExpenseCategory} employee={employee} claim_item={claim_item} claim_status={claim_status} expense_types={this.props.expense_types} handleDeleteItem={this.handleDeleteItem} handleEditItem={this.handleEditItem}/>
    )
  }
}


function mapStateToProps(state) {
  return {
  }
}

export default withRouter(connect(mapStateToProps)(ClaimItemContainer));
