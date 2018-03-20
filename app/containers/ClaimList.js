import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal';
import { claimsActions, policiesActions, claimItemsActions, approvalLimitsActions, emailActions } from '../actions';
import ClaimContainer from './ClaimContainer';
import NewClaimModal from './NewClaimModal';
import { emailAPI } from "../api";
import { Tabs, Tab } from 'react-bootstrap';
import {toastr} from "react-redux-toastr";
import {toastrHelpers} from "../helpers";

class ClaimList extends React.Component {
  constructor(props) {
    super(props);
    this.createClaim = this.createClaim.bind(this);
    this.showNewClaimModal = this.showNewClaimModal.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.renderDrafts = this.renderDrafts.bind(this);
    this.renderEmptyDrafts = this.renderEmptyDrafts.bind(this);
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
    const claimant_email = this.props.claimant_email;
    const approver_email = this.props.approver_email;
    const claim = {
      claimant_id: employee.id,
      approver_id: employee.manager_id,
      company_id: parseInt(form.NewClaimForm.values.company_id.value),
      cost_centre_id: parseInt(form.NewClaimForm.values.cost_centre_id.value),
      description: form.NewClaimForm.values.description,
      account_number: form.NewClaimForm.values.account_number,
      status: 'P',
    }

    this.props.dispatch(claimsActions.addClaim(claim)).then((res) => {
      if (res.type === "ADD_CLAIM_FAILURE") {
        toastr.removeByType("error");
        toastr.error('Error Creating Claim', 'Please try again.', toastrHelpers.getErrorOptions())
      }
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
    let claims = Object.entries(claimsMap);
    if (claims.length <= 0) {
      return this.renderEmptyListAll();
    } else {
      return (
        <div className="claim-list">
          {claims.reverse().map((claim_tuple) => {
            var claim = claim_tuple[1]
            return <ClaimContainer claim={claim} renderEmptyList={this.renderEmptyListAll} employee={employee} key={claim.claim_id}/>
          })}
        </div>
        )
    }
  }

  renderEmptyListAll() {
    return (
      <div className="claim-container">
        You have not submitted any claims and do not have any drafts.
      </div>
    )
  }

  renderEmptyDrafts() {
    return (
      <div className="claim-container">
        You currently do not have any drafts.
      </div>
      )
  }

  renderEmptySubmitted() {
    return (
      <div className="claim-container">
        You have not yet submitted any claims.
      </div>
      )
  }

  renderEmptyApproved() {
    return (
      <div className="claim-container">
        You do not have any processed claims at this time.
      </div>
      )
  }


  renderDrafts() {
    const { employee, claimsMap } = this.props;
    let claims = Object.entries(claimsMap).filter(claim_tuple => {
          var claim = claim_tuple[1];
          return claim.status === "P";
        });
    if (claims.length <= 0) {
      return this.renderEmptyDrafts();
    } else {
      return (
        <div className="claim-list">
          {claims.map((claim_tuple) => {
            var claim = claim_tuple[1]
            return <ClaimContainer claim={claim} renderEmptyList={this.renderEmptyListAll} employee={employee} key={claim.claim_id}/>
          })
        }
        </div>
        )
    }
  }

  renderSubmitted() {
    const { employee, claimsMap } = this.props;
    let claims = Object.entries(claimsMap).filter(claim_tuple => {
          var claim = claim_tuple[1];
          return claim.status === "S";
        });

    if (claims.length <= 0) {
      return this.renderEmptySubmitted();
    } else {
      return (
        <div className="claim-list">
          { claims.map((claim_tuple) => {
            var claim = claim_tuple[1]
            return <ClaimContainer claim={claim} renderEmptyList={this.renderEmptyListAll} employee={employee} key={claim.claim_id}/>
          })
        }
        </div>
        )
    }
  }

  renderApproved() {
    const { employee, claimsMap } = this.props;
    let claims = Object.entries(claimsMap).filter(claim_tuple => {
          var claim = claim_tuple[1];
          return claim.status === "A" || claim.status === "D";
        });
    if (claims.length <= 0) {
      return this.renderEmptyApproved();
    } else {
      return (
        <div className="claim-list">
          {claims.map((claim_tuple) => {
            var claim = claim_tuple[1]
            return <ClaimContainer claim={claim} renderEmptyList={this.renderEmptyApproved} employee={employee} key={claim.claim_id}/>
          })
        }
        </div>
        )
    }
  }


  render() {
    const { employee, claimsMap, error, isFetching, totals, form } = this.props;
    
    if (error !== undefined) {
      return this.renderError(error);
    }
    
    if (isFetching && claimsMap == undefined) {
      return this.renderFetching();
    }
    
    // if (!isFetching && (claimsMap == undefined || Object.keys(claimsMap)[0] == undefined)) {
    //   return this.renderEmptyList();
    // }
    
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
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Most Recent">
              { this.renderEntries() }
          </Tab>
          <Tab eventKey={2} title="Drafts">
              { this.renderDrafts() }
          </Tab>
          <Tab eventKey={3} title="Under Review">
              { this.renderSubmitted() }
          </Tab>
          <Tab eventKey={4} title="Processed">
              { this.renderApproved() }
          </Tab>
        </Tabs>
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
      form,
  };
}
export default withRouter(connect(mapStateToProps)(ClaimList))
