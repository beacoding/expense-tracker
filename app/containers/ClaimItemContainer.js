import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimItemsActions } from '../actions';
import ClaimItem from '../components/ClaimItem'

class ClaimItemContainer extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    const { claim_item, employee } = this.props;
    return (
        <ClaimItem employee = {employee} claim_item = {claim_item}/>
    )
  }
}

export default withRouter(ClaimItemContainer)
