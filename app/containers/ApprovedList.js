import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimsActions } from '../actions';
import { approvalLimitsActions } from '../actions';
import ReportsClaimContainer from './ReportsClaimContainer';

class ApprovalList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(claimsActions.requestApprovedApprovals());
  }

  renderError(error) {
    return <div> {error} </div>
  }

  renderEmptyList() {
    return (
          <div className="claim-container">
            You do not have any claims pending your approval.
          </div>
    )
  }

  renderFetching() {
    return <div className="loader"></div>
  }

  render() {
    const { employee, approvedClaims, policies, error, isFetching } = this.props;
    
    if (error !== undefined) {
      return this.renderError(error);
    }

    if (isFetching && approvedClaims == undefined) {
      return this.renderFetching();
    }

    if (!isFetching && (approvedClaims == undefined || Object.keys(approvedClaims)[0] == undefined)) {
      return this.renderEmptyList();
    }

    return (
        <div className="claim-list">
          {Object.entries(approvedClaims).map((claim_tuple) => {
            var claim = claim_tuple[1]
              return <ReportsClaimContainer
                        claim={claim}
                        employee={employee}
                        key={claim.claim_id}/>
          })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication, claims, policies } = state;
  const { employee } = authentication;
  const { approvedClaims, error, isFetching } = claims;

  return {
    employee,
    approvedClaims,
    policies,
    error,
    isFetching
  };
}
export default withRouter(connect(mapStateToProps)(ApprovalList))
