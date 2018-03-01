import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ApprovalList from './ApprovalList';
import ApprovedList from './ApprovedList';
import Approvals from '../components/Approvals';
import ApprovedClaims from '../components/ApprovedClaims';
import { claimsActions } from '../actions';
import { approvalLimitsActions } from '../actions';
import { Tabs, Tab } from 'react-bootstrap';

class ApprovalPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.mountApprovalList();
    this.props.mountApprovedList();
  }

  renderEmptyListApproval() {
    return (
          <div className="claim-container">
            You do not have any claims pending your approval.
          </div>
    )
  }

  renderEmptyListApproved() {
    return (
          <div className="claim-container">
            You have not approved any claims.
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
            </div>
          </div>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Pending Approvals">
                <Approvals props={this.props} renderEmptyList={this.renderEmptyListApproval} renderError={this.renderError} />
            </Tab>
            <Tab eventKey={2} title="Approved">
                <ApprovedClaims props={this.props} renderEmptyList={this.renderEmptyListApproved} renderError={this.renderError} />
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
    mountApprovedList: () => {
      dispatch(claimsActions.clearAll());
      dispatch(claimsActions.requestApprovedApprovals());
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
