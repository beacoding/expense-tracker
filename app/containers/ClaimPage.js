import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal';
import { claimItemsActions } from '../actions';
import { claimsActions } from '../actions';
import ClaimItemContainer from './ClaimItemContainer';
import NewClaimItemModal from './NewClaimItemModal';
import ModalContainer from './ModalContainer'

class ClaimPage extends React.Component {
  constructor(props) {
    super(props);
    this.returnToClaimsList = this.returnToClaimsList.bind(this);
    this.createClaimItem = this.createClaimItem.bind(this);
    this.showNewClaimItemModal = this.showNewClaimItemModal.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let claim_id = window.location.pathname.split("/")[2];
    if (claim_id != undefined) {
      this.props.dispatch(claimItemsActions.requestAll(claim_id));
      this.props.dispatch(claimsActions.requestOne(claim_id))
    }
  }

  returnToClaimsList() {
    let page = window.location.pathname.split("/")[1];
    if (page == 'claims') {
      window.location= '/claims/';
    } else {
      window.location= '/approvals/';      
    }
  }

  createClaimItem(data) {
    let claim_id = window.location.pathname.split("/")[2];
    const { employee, form } = this.props;
    let receipt = (data.no_receipt === true) ? null : data.receipt[0];
    const item = {
      claim_id: parseInt(claim_id),
      description: data.description,
      amount: parseFloat(data.amount),
      comment: data.comment,
      expense_type: parseInt(data.expense_type),
      receipt: receipt
    }   
    this.props.dispatch(claimItemsActions.addClaimItem(item)).then(() => {
      modal.clear();
    });;
  }

  showNewClaimItemModal(){
    modal.add( NewClaimItemModal, {
      title: 'Add Item',
      size: 'medium', // large, medium or small,
      closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
      hideCloseButton: false, // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;)
      onSubmitFunction: this.createClaimItem
    });
  }

  confirmSubmit() {
    let claim_id = window.location.pathname.split("/")[2];
    this.props.dispatch(claimsActions.updateStatus(claim_id, this.props.employee.manager_id, "S")).then(() => {
      modal.clear();
      this.returnToClaimsList();
    });
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

  renderError(error) {
    return <div> {error} </div>
  }

  renderFetching() {
    return <div className="loader"></div>
  }
  

  render() {
    const { employee, claimItems, isFetching, claimsMap, error } = this.props;
    let claim_id = window.location.pathname.split("/")[2];
  
    if (error !== undefined) {
      return this.renderError(error);
    }

    if (!(claim_id in claimsMap)) {
      return this.renderFetching();
    }
    const claimItemsObj = claimItems.claimItemsMap[claim_id] || {};

    let claim = claimsMap[claim_id];
    let status = claim.status

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
        <div className="claim-container">
          { (status == 'P') && <button className="page-button" onClick={this.showNewClaimItemModal}> New Item</button> }
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Amount (CAD)</th>
                <th scope="col">Expense Category</th>
                <th scope="col">Receipt</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
            {
              Object.entries(claimItemsObj).map((claimItem) => {
                const claim_item_entry = claimItem[1];
                return <ClaimItemContainer key={claim_item_entry.claim_item_id} claim_id={claim_id} claim_status={claim.status} employee={employee} claim_item={claim_item_entry} />
              })
            }
            </tbody>
          </table>
          { (status == 'P') &&
          <div className="buttons-row">
            <button className="page-button-blue" onClick={this.handleSubmit}>Submit Claim</button>
          </div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication, claimItems, claims, form } = state;
  const { error, isFetching } = claimItems;
  const { employee } = authentication;
  const { claimsMap } = claims;
  return {
    employee,
    claimItems,
    isFetching,
    claimsMap,
    error,
    form
  };
}

export default withRouter(connect(mapStateToProps)(ClaimPage))
