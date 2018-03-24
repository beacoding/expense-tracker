import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal';
import { claimsActions, claimItemsActions, emailActions, policiesActions } from '../actions';
import classNames from 'classnames';
import ClaimItemContainer from './ClaimItemContainer';
import NewClaimItemModal from './NewClaimItemModal';
import ModalContainer from './ModalContainer'
import { emailAPI } from "../api";
import { claimsHelpers, toastrHelpers } from '../helpers';
import { toastr } from 'react-redux-toastr';

class ClaimPage extends React.Component {
  constructor(props) {
    super(props);
    this.returnToClaimsList = this.returnToClaimsList.bind(this);
    this.createClaimItem = this.createClaimItem.bind(this);
    this.showNewClaimItemModal = this.showNewClaimItemModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentDidMount() {
    let claim_id = undefined;
    if (window.location.pathname.split("/")[1] != "admin") {
      claim_id = window.location.pathname.split("/")[2];
    } else {
      claim_id = window.location.pathname.split("/")[3];
    }
    if (claim_id != undefined) {
      this.props.dispatch(claimItemsActions.requestAll(claim_id));
      this.props.dispatch(claimsActions.requestOne(claim_id));
      this.props.dispatch(policiesActions.requestExpenseTypes());
      this.props.dispatch(policiesActions.requestAll())
    }
  }

  returnToClaimsList() {
    let page = window.location.pathname.split("/")[1];
    if (page == 'claims') {
      window.location = '/claims/';
    } else if (page == 'approvals') {
      window.location = '/approvals/';      
    } else {
      window.location = '/admin/reports/';      
    }
  }
  
  confirmSubmit() {
    let claim_id = window.location.pathname.split("/")[2];
    let claim = this.props.claimsMap[claim_id];
    const claimItemsObj = this.props.claimItems.claimItemsMap[claim_id] || {};
    claimsHelpers.calculateTotal(claim, claimItemsObj)
    if (claim.total_amount > this.props.max_policy_limits["Maximum Per Diem Amount"]) {
      toastr.removeByType("error");
      toastr.error('Policy Violation', 'Claim exceeds maximum per diem amount of $' + this.props.max_policy_limits["Maximum Per Diem Amount"] + '.', toastrHelpers.getErrorOptions());
      return;
    } else {
      this.props.dispatch(claimsActions.updateStatus(claim_id, this.props.employee.manager_id, "S")).then((res) => {
        if (res.type === "UPDATE_CLAIM_STATUS_SUCCESS") {
          toastr.removeByType("error");
          toastr.success('Claim Submitted', 'Your claim has been submitted to your manager for review.');
          this.props.dispatch(emailActions.sendClaimantEmail(this.props.claimsMap[claim_id], "S"));
          this.props.dispatch(emailActions.sendApproverEmail(this.props.claimsMap[claim_id], this.props.employee.manager_id, "S"));
          modal.clear();
          this.returnToClaimsList()
        } else {
          toastr.removeByType("error");
          toastr.error('Error Submitting Claim', 'Please try again.', toastrHelpers.getErrorOptions());
        }
      });
    }
  }

  handleSubmit() {
    modal.add(ModalContainer, {
      title: 'Submit Claim?',
      bodyHtml: `
      <p>Are you sure you want to submit this claim request?</p>
      <p>Once the claim has been submitted, it can no longer be modified.</p>
      <br/>
      `,
      size: 'medium',
      hideCloseButton: true,
      affirmativeAction: this.confirmSubmit,
      affirmativeText: 'Yes',
      negativeText: 'No'
    });
  }

  confirmDelete() {
    let claim_id = window.location.pathname.split("/")[2];
    this.props.dispatch(claimsActions.deleteClaim(claim_id)).then(() => {
      modal.clear();
      window.location = '/claims/';
      toastr.removeByType("error")
      toastr.error("Claim deleted", "You have deleted the claim")
    });
  }

  handleDelete() {
    modal.add(ModalContainer, {
      title: 'Delete Claim?',
      bodyHtml: `
      <p>Are you sure you want to delete this claim?</p>
      <p>All claim items will be deleted and you will need to re-enter all of the information.</p>
      <br/>
      `,
      size: 'medium',
      hideCloseButton: true,
      affirmativeAction: this.confirmDelete,
      affirmativeText: 'Yes',
      negativeText: 'No'
    });
  }

  createClaimItem(data) {
    let claim_id = window.location.pathname.split("/")[2];
    const { employee, form, max_policy_limits } = this.props;
    let receipt = (data.no_receipt === true) ? null : data.receipt[0];

    if (parseInt(data.expense_type) === 12) {
      let distance = isNaN(data.mileage) ? 0 : data.mileage;
      let amount = (distance * max_policy_limits["Per Mileage Reimbursement"]) || 0.00;
      data.amount = amount;
    }
    const item = {
      claim_id: parseInt(claim_id),
      description: data.description,
      amount: data.amount,
      comment: data.comment,
      expense_type: parseInt(data.expense_type),
      receipt: receipt
    }   
    this.props.dispatch(claimItemsActions.addClaimItem(item)).then((res) => {
      if (res.type === "ADD_CLAIM_ITEM_SUCCESS") {
        toastr.removeByType("error");
        toastr.success('Claim Item Added', 'Claim Item has been successfully added.');
      } else {
        toastr.removeByType("error");
        toastr.error('Error Adding Claim Item', 'Please try again.', toastrHelpers.getErrorOptions())
      }
      modal.clear();
      toastr.removeByType("error")
    });;
  }

  showNewClaimItemModal(){
    modal.add( NewClaimItemModal, {
      title: 'Add Claim Item',
      size: 'medium', // large, medium or small,
      closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
      hideCloseButton: false, // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;)
      onSubmitFunction: this.createClaimItem,
      expense_types: this.props.expense_types,
      policies: this.props.max_policy_limits,
      currentValues: this.props.form.NewClaimItemForm ? this.props.form.NewClaimItemForm.values : {}
    });
  }

  renderError(error) {
    return <div> {error} </div>
  }

  renderFetching() {
    return <div className="loader"></div>
  }

  render() {
    const { employee, claimItems, isFetching, claimsMap, expense_types, error } = this.props;
    
    let claim_id = undefined;
    let claimantView = false;
    if (window.location.pathname.split("/")[1] != "admin") {
      if (window.location.pathname.split("/")[1] == 'claims' ) {
        claimantView = true;
      }
      claim_id = window.location.pathname.split("/")[2];
    } else {
      claim_id = window.location.pathname.split("/")[3];
    }

    if (error !== undefined) {
      return this.renderError(error);
    }

    if (!(claim_id in claimsMap)) {
      return this.renderFetching();
    }
    const claimItemsObj = claimItems.claimItemsMap[claim_id] || {};

    let claim = claimsMap[claim_id];
    let status = claim.status;
    claimsHelpers.calculateTotal(claim, claimItemsObj);

    // FOR THE COLOURED BAR
    let stepCompletionIndex = 0;
    if (claim.total_amount > 0) {
      stepCompletionIndex = 1;
      if (status == 'S' || status == 'F') {
        stepCompletionIndex = 2;
      }
      if (status == 'A' || status == 'D') {
        stepCompletionIndex = 3;
      }
    }

    return (
      <div className="claimlist-container">
        <div className="page-header">
          <div className="page-title">
            View Claim > {claim.description}
          </div>
          <div className="page-route">
            <span className="route-inactive"></span>
            <button className="page-button" style={{float: 'left'}} onClick={this.returnToClaimsList}>Back</button>
          </div>
        </div>
        <div className="item-container">
          { claimantView && <div className="progress-meter">
            <div className="track" >
              <span className="progress" style={{width: ((stepCompletionIndex / 3) * 100) + "%"}}></span>
            </div>
            <ol className="progress-points">
              <li className={classNames('progress-point', { completed: (claim.total_amount > 0), active: status == 'P' })}>
                <span className="label">Add Claim Items</span>
              </li>
              <li className={classNames('progress-point', { completed: status !== 'P', active: claim.total_amount > 0 })}>
                <span className="label">Submit Claim</span>
              </li>
              <li className={classNames('progress-point', { completed: (status == 'A' || status == 'D'), active: (status == 'S' || status == 'F')})}>
                <span className="label">Manager Review</span>
              </li>
              <li className={classNames('progress-point', { completed: (status == 'A' || status == 'D'), active: false })}>
                <span className="label">Claim Processed</span>
              </li>
            </ol>
          </div> }
          </div>
          <div className="item-table">
           { (status == 'P') && <button className="page-button" onClick={this.showNewClaimItemModal}> New Item</button> }
            
          <table className="table table-striped" cellSpacing="20px">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Amount (CAD)</th>
                <th scope="col">Expense Category</th>
                <th scope="col">Receipt</th>
                <th scope="col">Comments</th>
                { (status == 'P') && <th scope="col"></th> }
              </tr>
            </thead>
            <tbody>
            {
              Object.entries(claimItemsObj).map((claimItem) => {
                const claim_item_entry = claimItem[1];
                return <ClaimItemContainer key={claim_item_entry.claim_item_id} claim_id={claim_id} claim_status={claim.status} expense_types={expense_types} employee={employee} claim_item={claim_item_entry} createClaimItem={this.createClaimItem} policies={this.props.max_policy_limits} />
              })
            }
            </tbody>
          </table>
        { claim.notes && <i className="ion-android-alert"> Approver Notes: {claim.notes}</i> }
        </div>
        { (status == 'P') &&
        <div>
          <div className="padded-buttons-row">
            <button className="page-button-red" onClick={this.handleDelete}>Delete Claim</button>        
            <button className="page-button-blue" onClick={this.handleSubmit}>Submit Claim</button>
          </div>
          <div className="help-text-row">
            <i className="ion-android-alert help-text">You may leave this page and continue this claim later. Your claim items are automatically saved.</i>
          </div>
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication, claimItems, claims, form, policies } = state;
  const { error, isFetching } = claimItems;
  const { employee } = authentication;
  const { claimsMap } = claims;
  const { expense_types } = policies;
  const max_policy_limits = policies.policies;
  return {
    employee,
    claimItems,
    isFetching,
    claimsMap,
    expense_types,
    error,
    form,
    max_policy_limits
  };
}

export default withRouter(connect(mapStateToProps)(ClaimPage))
