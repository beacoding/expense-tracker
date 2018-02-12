import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimsActions, claimItemsActions } from '../actions';
import { claimsHelpers } from '../helpers';
import { Link } from 'react-router-dom';
import { modal } from 'react-redux-modal'
import PendingClaim from '../components/PendingClaim'
import ModalContainer from './ModalContainer'

class PendingClaimContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAction = this.handleAction.bind(this);
    this.confirmApprove = this.confirmApprove.bind(this);
    this.confirmDecline = this.confirmDecline.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(claimItemsActions.requestAll(this.props.claim.claim_id));
  }

  confirmApprove() {
    modal.clear();
    this.props.dispatch(claimsActions.updateStatus(this.props.claim.claim_id, this.props.employee.id, "A"));
  }

  confirmDecline() {
    modal.clear();
    this.props.dispatch(claimsActions.updateStatus(this.props.claim.claim_id, this.props.employee.id, "D"));
  }

  handleAction(action) {
    switch (action.target.textContent) {
      case "Approve":
        modal.add(ModalContainer, {
          title: 'Confirm Approve?',
          bodyHtml: '<p>Are you sure you want to approve this claim request?</p>',
          size: 'medium',
          hideCloseButton: true,
          affirmativeAction: this.confirmApprove,
          affirmativeText: 'Yes',
          negativeText: 'No'
        });
        break;
      case "Decline":
        modal.add(ModalContainer, {
          title: 'Confirm Decline?',
          bodyHtml: '<p>Are you sure you want to decline this claim request?</p>',
          size: 'medium',
          hideCloseButton: true,
          affirmativeAction: this.confirmDecline,
          affirmativeText: 'Yes',
          negativeText: 'No'
        });
        break;
      case "Forward":
        modal.add(ModalContainer, {
          title: 'Forward Options',
          bodyHtml: '<p>Who would you like to forward this claim request to?</p>',
          size: 'medium',
          hideCloseButton: true,
          affirmativeAction: this.forwardClaim,
          affirmativeText: 'Forward Claim'
        });
        break;
      default:
        return;
    }
  }

  render() {
    const { employee, key, claim, claimItems } = this.props;
    if (claimItems[claim.claim_id] !== undefined) {
      claimsHelpers.calculateTotal(claim, claimItems[claim.claim_id]);
    }
    return (
      <div>
        <PendingClaim
          claim={claim}
          employee={employee}
          handleAction={this.handleAction}
          hasApprovalAuthority={true}
          hasSufficientApprovalLimit={true}
          key={claim.claim_id} />
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


export default withRouter(connect(mapStateToProps)(PendingClaimContainer));
