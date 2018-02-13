import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimsActions, claimItemsActions, approvalLimitsActions } from '../actions';
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
    this.forwardClaim = this.forwardClaim.bind(this);    
    this.setForwardManagerId = this.setForwardManagerId.bind(this);    
    this.forward_manager_id = null;
  }

  componentDidMount() {
    this.props.dispatch(claimItemsActions.requestAll(this.props.claim.claim_id));
  }
  
  confirmApprove() {
    this.props.dispatch(claimsActions.updateStatus(this.props.claim.claim_id, this.props.employee.id, "A"));
    modal.clear();
  }
  
  confirmDecline() {
    this.props.dispatch(claimsActions.updateStatus(this.props.claim.claim_id, this.props.employee.id, "D"));
    modal.clear();
  }

  forwardClaim() {
    this.props.dispatch(claimsActions.updateStatus(this.props.claim.claim_id, this.forward_manager_id, "F"));
    modal.clear();
  }

  setForwardManagerId(option) {
    this.forward_manager_id = option.value;
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
        this.props.dispatch(approvalLimitsActions.requestHasAuthority(this.props.claim.cost_centre_id));
        setTimeout(() => {
          modal.add(ModalContainer, {
            title: 'Forward Claim',
            bodyHtml: `<p>Who would you like to forward this claim request to?</p>`,
            hasDropdown: true,
            dropdownOptions: this.props.limits.managerOptions,
            dropdownDefaultValue: null,
            dropdownPlaceholder: "Select Manager",
            onChangeFunction: this.setForwardManagerId,
            size: 'medium',
            hideCloseButton: true,
            affirmativeAction: this.forwardClaim,
            affirmativeText: 'Forward Claim',
            negativeText: 'Cancel'
          });
        }, 500);
        break;
      default:
        return;
    }
  }

  render() {
    const { employee, key, claim, claimItems, limits } = this.props;
    let hasApprovalAuthority = false;
    let hasSufficientApprovalLimit = false;

    if (claimItems[claim.claim_id] !== undefined) {
      claimsHelpers.calculateTotal(claim, claimItems[claim.claim_id]);
      if (limits.limitsMap) {

        // An approval limit exists for this manager,
        // so they have approval authority for the cost centre
        if (limits.limitsMap[claim.cost_centre_id]) {
          hasApprovalAuthority = true;

          // An approval limit of NULL means said manager does not have an upper limit,
          // so treat as sufficient limit, otherwise ensure claim amount is less than limit
          if (limits.limitsMap[claim.cost_centre_id].approval_limit == undefined || 
              claim.total_amount <= limits.limitsMap[claim.cost_centre_id].approval_limit) {
            hasSufficientApprovalLimit = true;
          }
        }
      }
    }

    return (
      <div>
        <PendingClaim
          claim={claim}
          employee={employee}
          handleAction={this.handleAction}
          hasApprovalAuthority={hasApprovalAuthority}
          hasSufficientApprovalLimit={hasSufficientApprovalLimit}
          key={claim.claim_id} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { claimItems, limits } = state;
  return {
    claimItems,
    limits
  }
}


export default withRouter(connect(mapStateToProps)(PendingClaimContainer));
