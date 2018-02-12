import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimsActions } from '../actions';
import { claimItemsActions } from '../actions';
import PendingClaimContainer from './PendingClaimContainer';

class ApprovalList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(claimsActions.clearAll());
    this.props.dispatch(claimItemsActions.clearAll());
    this.props.dispatch(claimsActions.requestPendingApprovals());
  }

  renderError(error) {
    return <div> {error} </div>
  }

  renderEmptyList() {
    return (
      <div className="claimlist-container">
        <div className="page-header">
          <div className="page-title">
            Approvals
          </div>
          <div className="page-route">
            <span className="route-inactive">Home</span>  <span className="route-active"> > Approvals</span>
          </div>
        </div>
        <div className="claim-list">
          <div className="claim-container">
            You do not have any claims pending your approval.
          </div>
        </div>
      </div>
    )
  }

  renderFetching() {
    return <div className="loader"></div>
  }

  render() {
    const { employee, claimsMap, error, isFetching, requestAllClaimItems } = this.props;

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
            Approvals
          </div>
          <div className="page-route">
            <span className="route-inactive">Home</span>  <span className="route-active"> > Approvals</span>
          </div>
        </div>
        <div className="claim-list">
          {Object.entries(claimsMap).map((claim_tuple) => {
            var claim = claim_tuple[1]
              return <PendingClaimContainer
                        claim={claim}
                        employee={employee}
                        key={claim.claim_id}/>
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { authentication, claims } = state;
    const { employee } = authentication;
    const { claimsMap, error, isFetching } = claims;

    return {
        employee,
        claimsMap,
        error,
        isFetching,
    };
}
export default withRouter(connect(mapStateToProps)(ApprovalList))
