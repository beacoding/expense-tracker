import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimItemsActions } from '../actions';
import { Link } from 'react-router-dom';
import Claim from '../components/Claim'

class ClaimItemContainer extends React.Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    this.props.dispatch(claimItemsActions.requestAll(this.props.claim.claim_id));
  }

  render() {
    const { employee, key, claim, claimItems } = this.props;
    if (claimItems[claim.claim_id] !== undefined) {
      calculateTotal(claim, claimItems[claim.claim_id]);
    }
    return (
      <div>
        <Claim claim={claim} employee={employee} key={claim.claim_id} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { claimItems } = state;
  return {
    claimItems
  }
}


function calculateTotal(claim, claimItems) {
  let currentTotal = 0;
  claimItems.forEach((claimItem) => {
    let amount = claimItem.amount;
    currentTotal += amount;
  });

  claim["total_amount"] = currentTotal;
}


export default withRouter(connect(mapStateToProps)(ClaimItemContainer));
