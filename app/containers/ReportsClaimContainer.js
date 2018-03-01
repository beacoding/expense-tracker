import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimItemsActions } from '../actions';
import { claimsHelpers } from '../helpers';
import { Link } from 'react-router-dom';
import ReportsClaim from '../components/ReportsClaim'

class ReportsClaimContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(claimItemsActions.requestAll(this.props.claim.claim_id));
  }

  render() {
    const { employee, key, claim, claimItems } = this.props;
    claimsHelpers.calculateTotal(claim, claimItems.claimItemsMap[claim.claim_id]);
    return (
      <ReportsClaim claim={claim} employee={employee} key={claim.claim_id} />
    )
  }
}

function mapStateToProps(state) {
  const { claimItems } = state;
  return {
    claimItems
  }
}

export default withRouter(connect(mapStateToProps)(ReportsClaimContainer));
