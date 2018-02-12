import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimsActions } from '../actions';
import { claimItemsActions } from '../actions';
import ClaimContainer from './ClaimContainer';
import { Link } from 'react-router-dom';
import {modal} from 'react-redux-modal';
import NewClaimModal from './NewClaimModal';
import ReduxModal from 'react-redux-modal';


class ClaimList extends React.Component {
  constructor(props) {
    super(props);
    this.handlerFunction = this.handlerFunction.bind(this);
    this.addModal = this.addModal.bind(this);
  }
 
  handlerFunction() {
    const {employee, form} = this.props;
    const claim = {
      claimeeid: employee.id,
      approverid: employee.manager_id,
      companyid: parseInt(form.NewClaimForm.values.companyid),
      costcenter: parseInt(form.NewClaimForm.values.costcenter),
      description: form.NewClaimForm.values.description,
      acc_number: form.NewClaimForm.values.ccaccountnumber,
      // payroll: false,
      // payroll: form.NewClaimForm.values.payroll,
      notes: form.NewClaimForm.values.notes,
      status: null,
    }
 
    modal.clear();
    this.props.dispatch(claimsActions.addClaim(claim));
    this.props.dispatch(claimsActions.requestAll());
  }

  addModal() {
    modal.add(NewClaimModal, {
      title: 'New Claim',
      size: 'medium', // large, medium or small,
      closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
      hideCloseButton: false, // (optional) if you don't wanna show the top right close button
      onSubmitFunction: this.handlerFunction
    });
  }

  componentDidMount() {
    this.props.dispatch(claimsActions.clearAll());
    this.props.dispatch(claimItemsActions.clearAll());
    this.props.dispatch(claimsActions.requestAll());
  }

  renderError(error) {
    return <div> {error} </div>
  }

  renderEmptyList() {
    return (
      <div className="claimlist-container">
        <div className="page-header">
          <div className="page-title">
            My Claims
          </div>
          <button className="page-button" onClick={this.addModal}> New Claim</button>  
          <div className="page-route">
            <span className="route-inactive">Home</span>  <span className="route-active"> > My Claims</span>
          </div>
        </div>
        <div className="claim-list">
          <div className="claim-container">
            You have not created any claims yet.
          </div>
        </div>
      </div>
    )
  }

  renderFetching() {
    return <div className="loader"></div>
  }

  render() {
    const { employee, claimsMap, error, isFetching, totals, requestAllClaimItems,form} = this.props;
    
    if (error !== undefined) {
      return this.renderError(error);
    }

    if (isFetching && claimsMap == undefined) {
      return this.renderFetching();
    }

    if (!isFetching && (claimsMap == undefined || Object.keys(claimsMap)[0] == undefined)) {
      return this.renderEmptyList();
    }

    return (
      <div className="claimlist-container">
        <div className="page-header">
          <div className="page-title">
            My Claims
          </div>
          <button className="page-button" onClick={this.addModal}> New Claim</button>  
          <div className="page-route">
            <span className="route-inactive">Home</span>  <span className="route-active"> > My Claims</span>
          </div>
        </div>
        <div className="claim-list">
          {Object.entries(claimsMap).map((claim_tuple) => {
            var claim = claim_tuple[1]
              return <ClaimContainer claim={claim} employee={employee} key={claim.claim_id}/>
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { authentication, claims, form } = state;
    const { employee } = authentication;
    const { claimsMap, error, isFetching } = claims;
    

    return {
        employee,
        claimsMap,
        error,
        isFetching,
        form
    };
}
export default withRouter(connect(mapStateToProps)(ClaimList))
