import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {claimsActions, claimItemsActions, approvalLimitsActions, emailActions, employeesActions} from '../actions';
import {claimsHelpers, toastrHelpers} from '../helpers';
import { Link } from 'react-router-dom';
import { modal } from 'react-redux-modal'
import PendingClaim from '../components/PendingClaim'
import ModalContainer from './ModalContainer'
import {toastr} from 'react-redux-toastr';

class PendingClaimContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAction = this.handleAction.bind(this);
    this.confirmApprove = this.confirmApprove.bind(this);
    this.confirmDecline = this.confirmDecline.bind(this);
    this.forwardClaim = this.forwardClaim.bind(this);   
    this.clearInputs = this.clearInputs.bind(this);       
    this.setForwardManagerId = this.setForwardManagerId.bind(this);  
    this.setClaimNotes = this.setClaimNotes.bind(this);          
    this.forward_manager_id = null;
    this.claim_notes = null;
  }

  componentDidMount() {
    this.props.dispatch(claimItemsActions.requestAll(this.props.claim.claim_id));
  }
  
  confirmApprove() {
    this.props.dispatch(claimsActions.updateStatus(this.props.claim.claim_id, this.props.employee.id, "A", this.claim_notes)).then((res) => {
      this.props.dispatch(emailActions.sendClaimantEmail(this.props.claim, "A"));
      this.props.dispatch(claimsActions.requestPendingApprovals());
      if (res.type === "UPDATE_CLAIM_STATUS_SUCCESS") {
        modal.clear();
        toastr.removeByType("error");
        toastr.success('Claim Approved', this.props.claim.claimant_first_name + ' ' + this.props.claim.claimant_last_name + ' will be notified.')
      } else {
        toastr.removeByType("error");
        toastr.error('Error Approving Claim', 'Please try again.', toastrHelpers.getErrorOptions())
      }
    });
  }
  
  confirmDecline() {
    this.props.dispatch(claimsActions.updateStatus(this.props.claim.claim_id, this.props.employee.id, "D", this.claim_notes)).then((res) => {
      this.props.dispatch(emailActions.sendClaimantEmail(this.props.claim, "D"));
      this.props.dispatch(claimsActions.requestPendingApprovals());
      if (res.type === "UPDATE_CLAIM_STATUS_SUCCESS") {
        modal.clear();
        toastr.removeByType("error");
        toastr.warning('Claim Declined', this.props.claim.claimant_first_name + ' ' + this.props.claim.claimant_last_name + ' will be notified.')
      } else {
        toastr.removeByType("error");
        toastr.error('Error Declining Claim', 'Please try again.', toastrHelpers.getErrorOptions())
      }
    });
  }

  forwardClaim() {
    this.props.dispatch(claimsActions.updateStatus(this.props.claim.claim_id, this.forward_manager_id, "F", this.claim_notes)).then((res) => {
      this.props.dispatch(emailActions.sendClaimantEmail(this.props.claim, "F"));
      this.props.dispatch(emailActions.sendApproverEmail(this.props.claim, this.forward_manager_id, "F"));
      this.props.dispatch(claimsActions.requestPendingApprovals());
      if (res.type === "UPDATE_CLAIM_STATUS_SUCCESS") {
        modal.clear();
        toastr.removeByType("error");
        toastr.confirm('Claim Forwarded', this.props.claim.claimant_first_name + ' ' + this.props.claim.claimant_last_name + ' and the selected manager will be notified.')
      } else {
        toastr.removeByType("error");
        toastr.error('Error Forwarding Claim', 'Please try again.', toastrHelpers.getErrorOptions())
      }
    });
  }

  clearInputs() {
    this.forward_manager_id = null;
    this.claim_notes = null;
    modal.clear();
  }
  
  setForwardManagerId(option) {
    this.forward_manager_id = option.value;
  }

  setClaimNotes(action) {
    this.claim_notes = action.target.value;
  }
  
  handleAction(action) {
    switch (action.target.textContent) {
      case "Approve":
        modal.add(ModalContainer, {
          title: 'Confirm Approve?',
          bodyHtml: `
            <p>Are you sure you want to approve this claim request?</p>
            <p>You may use the text area below to leave a comment.</p>            
          `,
          hasTextArea: true,
          textAreaValue: this.claim_notes,
          textAreaPlaceholder: this.props.claim.notes || "Approver Notes",
          onTextAreaChangeFunction: this.setClaimNotes,
          textAreaRequired: true,
          size: 'medium',
          hideCloseButton: true,
          affirmativeAction: this.confirmApprove,
          affirmativeText: 'Yes',
          negativeAction: this.clearInputs,
          negativeText: 'No'
        });
        break;
      case "Decline":
        modal.add(ModalContainer, {
          title: 'Confirm Decline?',
          bodyHtml: `
            <p>Are you sure you want to decline this claim request?</p>
            <p>You may use the text area below to leave a comment.</p>            
          `,
          hasTextArea: true,
          textAreaValue: this.claim_notes,
          textAreaPlaceholder: this.props.claim.notes || "Approver Notes",
          onTextAreaChangeFunction: this.setClaimNotes,
          textAreaRequired: true,
          size: 'medium',
          hideCloseButton: true,
          affirmativeAction: this.confirmDecline,
          affirmativeText: 'Yes',
          negativeAction: this.clearInputs,          
          negativeText: 'No'
        });
        break;
      case "Forward":
        this.props.dispatch(approvalLimitsActions.requestHasAuthority(this.props.claim.cost_centre_id, parseFloat(this.props.claim.total_amount))).then(() => {
          modal.add(ModalContainer, {
            title: 'Forward Claim',
            bodyHtml: `
              <p>Who would you like to forward this claim request to?</p>
              <p>You may use the text area below to leave a comment.</p>            
            `,
            hasDropdown: true,
            dropdownOptions: this.props.policies.managerOptions,
            dropdownDefaultValue: null,
            dropdownPlaceholder: "Select Manager",
            onDropdownChangeFunction: this.setForwardManagerId,
            hasTextArea: true,
            textAreaValue: this.claim_notes,
            textAreaPlaceholder: this.props.claim.notes || "Approver Notes",
            onTextAreaChangeFunction: this.setClaimNotes,
            textAreaRequired: true,
            size: 'medium',
            hideCloseButton: true,
            affirmativeAction: this.forwardClaim,
            affirmativeText: 'Forward Claim',
            negativeAction: this.clearInputs,            
            negativeText: 'Cancel'
          });
        });
        break;
      default:
        return;
    }
  }

  render() {
    const { employee, key, claim, claimItems, policies } = this.props;
    let hasApprovalAuthority = false;
    let hasSufficientApprovalLimit = false;

    if (claimItems.claimItemsMap[claim.claim_id] !== undefined) {
      claimsHelpers.calculateTotal(claim, claimItems.claimItemsMap[claim.claim_id]);
    }
    if (policies.limitsMap) {
      // An approval limit exists for this manager,
      // so they have approval authority for the cost centre
      if (policies.limitsMap[claim.cost_centre_id]) {
        hasApprovalAuthority = true;

        // An approval limit of NULL means said manager does not have an upper limit,
        // so treat as sufficient limit, otherwise ensure claim amount is less than limit
        if (policies.limitsMap[claim.cost_centre_id][employee.id] !== undefined) {
          if (policies.limitsMap[claim.cost_centre_id][employee.id].approval_limit == undefined || 
              claim.total_amount <= policies.limitsMap[claim.cost_centre_id][employee.id].approval_limit) {
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
  const { claimItems, policies } = state;
  return {
    claimItems,
    policies
  }
}


export default withRouter(connect(mapStateToProps)(PendingClaimContainer));
