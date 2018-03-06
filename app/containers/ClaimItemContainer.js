import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimItemsActions } from '../actions';
import ClaimItem from '../components/ClaimItem'

class ClaimItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleDeleteItem() {
    const { claim_item } = this.props;
    const claim_id = window.location.pathname.split("/")[2]
    this.props.dispatch(claimItemsActions.deleteClaimItem(claim_id, claim_item.claim_item_id));
  }

  render() {
    const { claim_item, employee } = this.props;
    return (
      <ClaimItem employee={employee} claim_item={claim_item} handleDeleteItem={this.handleDeleteItem}/>
    )
  }
}


function mapStateToProps(state) {
  return {
  }
}

export default withRouter(connect(mapStateToProps)(ClaimItemContainer));
