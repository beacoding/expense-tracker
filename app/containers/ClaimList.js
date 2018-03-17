import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal';
import { claimsActions, policiesActions } from '../actions';
import { claimItemsActions, approvalLimitsActions } from '../actions';
import ClaimContainer from './ClaimContainer';
import NewClaimModal from './NewClaimModal';

class ClaimList extends React.Component {
  constructor(props) {
    super(props);
    this.createClaim = this.createClaim.bind(this);
    this.showNewClaimModal = this.showNewClaimModal.bind(this);
    this.reloadData = this.reloadData.bind(this);
  }
    
  componentDidMount() {
    this.props.dispatch(claimsActions.clearAll());
    this.props.dispatch(claimItemsActions.clearAll());
    this.props.dispatch(claimsActions.requestAll());
    this.props.dispatch(approvalLimitsActions.findAllCostCentres());
    this.props.dispatch(policiesActions.requestCompanies());
  }

  reloadData() {
    this.props.dispatch(claimsActions.clearAll());
    this.props.dispatch(claimsActions.requestAll());
  }
    
  showNewClaimModal() {
    modal.add(NewClaimModal, {
      title: 'New Claim',
      size: 'medium', // large, medium or small,
      closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
      hideCloseButton: false, // (optional) if you don't wanna show the top right close button
      onSubmitFunction: this.createClaim,
      cost_centres: this.props.cost_centres,
      companies: this.props.companies
    });
  }

  createClaim() {
    const { employee, form, claims, claimsMap } = this.props;
    const claim = {
      claimant_id: employee.id,
      approver_id: employee.manager_id,
      company_id: parseInt(form.NewClaimForm.values.company_id),
      cost_centre_id: parseInt(form.NewClaimForm.values.cost_centre_id),
      description: form.NewClaimForm.values.description,
      account_number: form.NewClaimForm.values.account_number,
      status: 'P',
    }
    this.props.dispatch(claimsActions.addClaim(claim)).then((res) => {
      modal.clear();
      window.location= '/claims/'+ res.claimId;
    });
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
          <button className="page-button-blue" onClick={this.reloadData}> Refresh</button>  
          <button className="page-button" onClick={this.showNewClaimModal}> New Claim</button>  
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

  renderEntries() {
    const { employee, claimsMap } = this.props;
    return (
      <div className="claim-list">
        {Object.entries(claimsMap).map((claim_tuple) => {
          var claim = claim_tuple[1]
          return <ClaimContainer claim={claim} employee={employee} key={claim.claim_id}/>
        })}
      </div>
      )
  }
  
  render() {
    const { employee, claimsMap, error, isFetching, totals, form } = this.props;
    
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
          <button className="page-button-blue" onClick={this.reloadData}> Refresh</button>  
          <button className="page-button" onClick={this.showNewClaimModal}> New Claim</button>  
          <div className="page-route">
            <span className="route-inactive">Home</span>  <span className="route-active"> > My Claims</span>
          </div>
        </div>
        { this.renderEntries() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication, claims, form, policies } = state;
  const { employee } = authentication;
  const { claimsMap, error, isFetching } = claims;
  const { cost_centres, companies, expense_types } = policies;

  return {
      employee,
      claimsMap,
      error,
      isFetching,
      cost_centres,
      companies,
      expense_types,
      form
  };
}
export default withRouter(connect(mapStateToProps)(ClaimList))
