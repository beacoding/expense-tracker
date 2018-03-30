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
              <div className="claim-list">
                <div className="claim-container">
                    <div className="loader">
                      <div className="spinner"></div>
                    </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey={2} title="Processed">
              <div className="claim-list">
                <div className="claim-container">
                    <div className="loader">
                      <div className="spinner"></div>
                    </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }

  render() {
    const { employee, claimsMap, claimItemsMap, policies, error, isFetching, reloadData } = this.props;

    if (isFetching) {
      return this.renderFetching();
    }

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
      dispatch(claimsActions.requestPendingApprovals());
    },
    mountApprovalList: () => {
      dispatch(claimsActions.requestPendingApprovals());
      dispatch(approvalLimitsActions.requestByEmployee());
    },
    mountProcessedList: () => {
      dispatch(claimsActions.requestProcessedApprovals());
      dispatch(approvalLimitsActions.requestByEmployee());
    }
  }
}

function mapStateToProps(state) {
  const { authentication, claims, claimItems, policies } = state;
  const { employee } = authentication;
  const { approvedClaims, claimsMap, error, isFetching } = claims;
  const { claimItemsMap } = claimItems;

  return {
    employee,
    approvedClaims,
    claimsMap,
    claimItemsMap,
    policies,
    error,
    isFetching
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApprovalPage))
