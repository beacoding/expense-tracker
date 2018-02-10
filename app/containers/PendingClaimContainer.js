import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimItemsActions } from '../actions';
import { claimsHelpers } from '../helpers';
import { Link } from 'react-router-dom';
import PendingClaim from '../components/PendingClaim'

class PendingClaimContainer extends React.Component {
  constructor(props) {
    super(props);
    this.approveClaim = this.approveClaim.bind(this);
    this.declineClaim = this.declineClaim.bind(this);
    this.forwardClaim = this.forwardClaim.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(claimItemsActions.requestAll(this.props.claim.claim_id));
  }

  approveClaim() {
    console.log("Handle Approve Claim for ID: " + this.props.claim.claim_id)
  }

  declineClaim() {
    console.log("Handle Decline Claim for ID: " + this.props.claim.claim_id)
  }

  forwardClaim() {
    console.log("Handle Forward Claim for ID: " + this.props.claim.claim_id)
  }

  render() {
    const { employee, key, claim, claimItems } = this.props;
    if (claimItems[claim.claim_id] !== undefined) {
      claimsHelpers.calculateTotal(claim, claimItems[claim.claim_id]);
    }
    return (
      <PendingClaim
        claim={claim}
        employee={employee}
        approveClaim={this.approveClaim}
        declineClaim={this.declineClaim}
        forwardClaim={this.forwardClaim}
        hasApprovalAuthority={true}
        hasSufficientApprovalLimit={true}
        key={claim.claim_id} />
    )
  }
}

function mapStateToProps(state) {
  const { claimItems } = state;
  return {
    claimItems
  }
}


export default withRouter(connect(mapStateToProps)(PendingClaimContainer));
