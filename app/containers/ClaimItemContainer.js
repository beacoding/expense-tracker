import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal';
import { claimItemsActions } from '../actions';
import ClaimItem from '../components/ClaimItem'
import ModalContainer from './ModalContainer'
import NewClaimItemModal from './NewClaimItemModal'
import { claimItemsHelpers, toastrHelpers } from '../helpers';
import { toastr } from "react-redux-toastr";

class ClaimItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.confirmDeleteItem = this.confirmDeleteItem.bind(this);    
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleChangeExpenseCategory = this.handleChangeExpenseCategory.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleEditReceipt = this.handleEditReceipt.bind(this);
    this.handleChangeDistance = this.handleChangeDistance.bind(this);
    this.handleEditMileage = this.handleEditMileage.bind(this);
    this.isDescriptionValid = this.isDescriptionValid.bind(this);
    this.isNumberAcceptable = this.isNumberAcceptable.bind(this);
  }

  confirmDeleteItem() {
    const { claim_id, claim_item } = this.props;
    this.props.dispatch(claimItemsActions.deleteClaimItem(claim_id, claim_item.claim_item_id)).then((res) => {
      if (res.type === "DELETE_CLAIM_ITEM_SUCCESS") {
        toastr.removeByType("error");
        toastr.success('Claim Item Deleted', 'Claim item has been successfully deleted.');
      } else {
        toastr.removeByType("error");
        toastr.error('Error Deleting Claim Item', 'Please try again.', toastrHelpers.getErrorOptions())
      }
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

  isNumberAcceptable(value) {
    var floatRegex = /^[0-9]*\.?[0-9]+/;
    return (floatRegex.test(value) && parseFloat(value) > 0);
  }

  validateMealExpense(max_amount, amount) {
    if (parseFloat(amount) <= 0) {
      toastr.removeByType("error");
      toastr.error('Policy Violation', 'Expense must be a positive amount.', toastrHelpers.getErrorOptions())
      return false;
    } else if (parseFloat(max_amount) < parseFloat(amount)) {
      toastr.removeByType("error");
      toastr.error('Policy Violation', 'A single meal expense must be no greater than $' + parseFloat(max_amount) + '.', toastrHelpers.getErrorOptions())
      return false;
    } else {
      return true;
    }
  }

  handleEditItem(key, claim_item, item) {
    let claim_id = parseInt(window.location.pathname.split("/")[2]);
    this.props.dispatch(claimItemsActions.editClaimItem(item, claim_id, claim_item.claim_item_id)).then((res) => {
      if (res.type === "EDIT_CLAIM_ITEM_SUCCESS") {
        toastr.removeByType("error");
        toastr.success('Claim Item Updated', 'Claim item has been successfully modified.');
      } else {
        toastr.removeByType("error");
        toastr.error('Error Updating Claim Item', 'Please try again.', toastrHelpers.getErrorOptions())
      }
    });
  }

  handleEditMileage(key, claim_item, item) {
    let claim_id = parseInt(window.location.pathname.split("/")[2]);
    let claimItem = {};
    claimItem.amount = claimItemsHelpers.distanceToAmount(item.mileage, this.props.policies["Per Mileage Reimbursement"]);
    this.props.dispatch(claimItemsActions.editClaimItem(claimItem, claim_id, claim_item.claim_item_id)).then((res) => {
      if (res.type === "EDIT_CLAIM_ITEM_SUCCESS") {
        toastr.removeByType("error");
        toastr.success('Claim Item Updated', 'Claim item has been successfully modified.');
      } else {
        toastr.removeByType("error");
        toastr.error('Error Updating Claim Item', 'Please try again.', toastrHelpers.getErrorOptions())
      }
    });
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

  handleChangeDistance(e)  {
   $("#distance-amount-" + this.props.claim_item.claim_item_id).val(claimItemsHelpers.distanceToAmount(e.target.value, this.props.policies["Per Mileage Reimbursement"]));
  }

  handleChangeExpenseCategory(claim_item, e) {
    let claim_id = window.location.pathname.split("/")[2];
    let item = {};
    item.expense_type = e.target.value;
    this.props.dispatch(claimItemsActions.editClaimItem(item, claim_id, claim_item.claim_item_id)).then((res) => {
      if (res.type === "EDIT_CLAIM_ITEM_SUCCESS") {
        toastr.removeByType("error");
        toastr.success('Claim Item Updated', 'Claim item has been successfully modified.');
      } else {
        toastr.removeByType("error");
        toastr.error('Error Updating Claim Item', 'Please try again.', toastrHelpers.getErrorOptions())
      }
    });
  }

  handleEditReceipt(claim_item, e) {
    let promise = new Promise ((resolve, reject) => {
      let claim_id = window.location.pathname.split("/")[2];
      let item = {};
      item.receipt = e.target.files[0];
      if (item.receipt.size > 2097152) {
        toastr.removeByType("error");
        toastr.error('Error Updating Receipt', 'Receipt file exceeds the maximum file size of 2MB. Please select a smaller file.', toastrHelpers.getErrorOptions())
        reject('File was too big');
      } else {
        claimItemsHelpers.encodeFileToB64(item.receipt).then(function (result) {
          item.receipt = result;
          this.props.dispatch(claimItemsActions.editReceipt(item, claim_id, claim_item.claim_item_id)).then((res) => {
            if (res.type === "EDIT_CLAIM_ITEM_SUCCESS") {
              toastr.removeByType("error");
              toastr.success('Claim Item Updated', 'Claim item has been successfully modified.');
              resolve();
            } else {
              toastr.removeByType("error");
              toastr.error('Error Updating Claim Item', 'Please try again.', toastrHelpers.getErrorOptions())
            }
          });
        }.bind(this))
      }
    });
    promise.catch( error =>  console.log(error) )
  }

  render() {
    const { claim_item, claim_status, employee } = this.props;
    return (
      <ClaimItem handleEditMileage={this.handleEditMileage}
                  policies={this.props.policies}
                  handleEditReceipt={this.handleEditReceipt}
                  handleChangeExpenseCategory={this.handleChangeExpenseCategory}
                  isDescriptionValid={this.isDescriptionValid}
                  isNumberAcceptable={this.isNumberAcceptable}                  
                  validateMealExpense={this.validateMealExpense}
                  employee={employee}
                  claim_item={claim_item}
                  claim_status={claim_status}
                  expense_types={this.props.expense_types}
                  handleDeleteItem={this.handleDeleteItem}
                  handleEditItem={this.handleEditItem}
                  handleChangeDistance={this.handleChangeDistance}/>
    )
  }
}


function mapStateToProps(state) {
  return {
  }
}

export default withRouter(connect(mapStateToProps)(ClaimItemContainer));
