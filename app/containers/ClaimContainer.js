import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimsActions, claimItemsActions } from '../actions';
import { claimsHelpers } from '../helpers';
import { Link } from 'react-router-dom';
import { modal } from 'react-redux-modal'
import Claim from '../components/Claim'
import ModalContainer from './ModalContainer'

class ClaimContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(claimItemsActions.requestAll(this.props.claim.claim_id));
  }

  confirmSubmit() {
    this.props.dispatch(claimsActions.updateStatus(this.props.claim.claim_id, this.props.employee.manager_id, "S")).then(() => {
      this.props.dispatch(claimsActions.requestAll());
      modal.clear();
    });
  }

  handleSubmit() {
    modal.add(ModalContainer, {
      title: 'Submit Claim?',
      bodyHtml: `
      <p>Are you sure you want to submit this claim request?</p>
      <p>Once the claim has been submitted, it can no longer be modified.</p>
      <br/>
      `,
      size: 'medium',
      hideCloseButton: true,
      affirmativeAction: this.confirmSubmit,
      affirmativeText: 'Yes',
      negativeText: 'No'
    });
  }

  confirmDelete() {
    this.props.dispatch(claimsActions.deleteClaim(this.props.claim.claim_id)).then(() => {
      this.props.dispatch(claimsActions.requestAll());
      modal.clear();
    });
  }

  handleDelete() {
    modal.add(ModalContainer, {
      title: 'Delete Claim?',
      bodyHtml: `
      <p>Are you sure you want to delete this claim request?</p>
      <p>Once the claim has been deleted, it can no longer be accessed.</p>
      <br/>
      `,
      size: 'medium',
      hideCloseButton: true,
      affirmativeAction: this.confirmDelete,
      affirmativeText: 'Yes',
      negativeText: 'No'
    });
  }

  render() {
    const { employee, key, claim, claimItems } = this.props;
    claimsHelpers.calculateTotal(claim, claimItems.claimItemsMap[claim.claim_id]);
    return (
      <Claim
        claim={claim}
        employee={employee}
        handleAction={this.handleSubmit}
        handleDelete={this.handleDelete}
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

export default withRouter(connect(mapStateToProps)(ClaimContainer));
