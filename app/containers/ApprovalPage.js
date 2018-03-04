import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Approvals from '../components/Approvals';
import ProcessedClaims from '../components/ProcessedClaims';
import { claimsActions } from '../actions';
import { approvalLimitsActions } from '../actions';
import { Tabs, Tab } from 'react-bootstrap';

class ApprovalPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.mountApprovalList();
    this.props.mountProcessedList();
  }

  renderEmptyListApproval() {
    return (
      <div className="claim-container">
        You do not have any claims pending your review.
      </div>
    )
  }

  renderEmptyListProcessed() {
    return (
      <div className="claim-container">
        You have not yet reviewed any claims.
      </div>
    )
  }

  renderError(error) {
    return <div> {error} </div>
  }

  renderEmptyList() {
    return (
      <div className="claimlist-container">
      </div>
    )
  }

  renderFetching() {
    return <div className="loader"></div>
  }

  render() {
    const { employee, claimsMap, policies, error, isFetching, reloadData } = this.props;

    return (
      <div>
        <div className="claimlist-container">
          <div className="page-header">
            <div className="page-title">
             Approvals
            </div>
            <div className="page-route">
              <span className="route-inactive">Home</span>  <span className="route-active"> > Approvals</span>
              <button className="page-button-blue" onClick={this.props.reloadData}> Refresh</button>  
            </div>
          </div>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Pending Approvals">
                <Approvals props={this.props} renderEmptyList={this.renderEmptyListApproval} renderError={this.renderError} />
            </Tab>
            <Tab eventKey={2} title="Processed">
                <ProcessedClaims props={this.props} renderEmptyList={this.renderEmptyListProcessed} renderError={this.renderError} />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    reloadData: () => {
      dispatch(claimsActions.clearAll());
      dispatch(claimsActions.requestPendingApprovals());
    },
    mountApprovalList: () => {
      dispatch(claimsActions.clearAll());
      dispatch(claimsActions.requestPendingApprovals());
      dispatch(approvalLimitsActions.requestByEmployee());
    },
    mountProcessedList: () => {
      dispatch(claimsActions.clearAll());
      dispatch(claimsActions.requestProcessedApprovals());
      dispatch(approvalLimitsActions.requestByEmployee());
    }
  }
}

function mapStateToProps(state) {
  const { authentication, claims, policies } = state;
  const { employee } = authentication;
  const { approvedClaims, claimsMap, error, isFetching } = claims;

  return {
    employee,
    approvedClaims,
    claimsMap,
    policies,
    error,
    isFetching
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApprovalPage))
