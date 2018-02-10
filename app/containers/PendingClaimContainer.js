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
  }

  componentDidMount() {
    this.props.dispatch(claimItemsActions.requestAll(this.props.claim.claim_id));
  }

  render() {
    const { employee, key, claim, claimItems } = this.props;
    if (claimItems[claim.claim_id] !== undefined) {
      claimsHelpers.calculateTotal(claim, claimItems[claim.claim_id]);
    }
    return (
        <PendingClaim claim={claim} employee={employee} key={claim.claim_id} />
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
