import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal';
import { approvalLimitsActions } from '../actions';
import ApprovalLimit from '../components/ApprovalLimit';
import ModalContainer from './ModalContainer'
import { toastr } from 'react-redux-toastr';
import { toastrHelpers } from '../helpers';

class ApprovalLimitsList extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditLimit = this.handleEditLimit.bind(this);
    this.handleDeleteLimit = this.handleDeleteLimit.bind(this);    
  }
    
  componentDidMount() {
    this.props.dispatch(approvalLimitsActions.requestWith({}));
  }

  handleEditLimit(employee_id, cost_centre_id, data) {
    this.props.dispatch(approvalLimitsActions.updateApprovalLimit(employee_id, cost_centre_id, data["new_approval_limit"])).then((res) => {
      if (res.type === "UPDATE_APPROVAL_LIMIT_SUCCESS") {
        toastr.removeByType("error");
        toastr.success('Approval Authority Updated', 'Approval authority has been successfully updated.', toastrHelpers.getSuccessOptions())
      } else {
        toastr.removeByType("error");
        toastr.error('Error Updating Approval Authority', 'Please try again.', toastrHelpers.getErrorOptions())
      }
      modal.clear();
    });;
  }

  confirmRevokeLimit(employee_id, cost_centre_id) {
    this.props.dispatch(approvalLimitsActions.revokeApprovalLimit(employee_id, cost_centre_id)).then((res) => {
      if (res.type === "REVOKE_APPROVAL_LIMIT_SUCCESS") {
        toastr.removeByType("error");
        toastr.success('Approval Authority Revoked', 'Approval authority has been successfully revoked.', toastrHelpers.getSuccessOptions())
      } else {
        toastr.removeByType("error");
        toastr.error('Error Revoking Approval Authority', 'Please try again.', toastrHelpers.getErrorOptions())
      }
      modal.clear();
    });
  }

  handleDeleteLimit(employee_id, cost_centre_id) {
    modal.add(ModalContainer, {
      title: 'Revoke Approval Authority?',
      bodyHtml: `
      <p>Are you sure you want to revoke this employee's approval authority for this cost centre?</p>
      <br/>
      `,
      size: 'medium',
      hideCloseButton: true,
      affirmativeAction: this.confirmRevokeLimit.bind(this, employee_id, cost_centre_id),
      affirmativeText: 'Yes',
      negativeText: 'No'
    });
  }

  renderEntries() {
    const { employee, limitsMap } = this.props;
    var keyCounter = 0;
    let approvalLimits = {};
    Object.entries(limitsMap).map((cost_centre_tuple) => {
      Object.entries(cost_centre_tuple[1]).map((limit_tuple) => {
        approvalLimits[keyCounter] = limit_tuple;
        keyCounter++;
      });
    });
    
    return (
      <tbody>
      {Object.entries(approvalLimits).map((limit_tuple, i) => {
        var limit_entry = limit_tuple[1][1];
        return <ApprovalLimit handleEditLimit={this.handleEditLimit} handleDeleteLimit={this.handleDeleteLimit} employee={employee} limit_entry={limit_entry} key={i} />
      })}
      </tbody>
      )
  }

  renderFetching() {
    return (
      <div className="claim-list">
        <div className="claim-container">
            <div className="loader">
              <div className="spinner"></div>
            </div>
        </div>
      </div>    
    )
  }

  renderEmptyList() {
    return (
      <div className="claim-container">
        No approval authorities were found.
      </div>
    )
  }

  render() {
    const { limitsMap, isFetching, errorAddApprovalLimit } = this.props;

    if (isFetching) {
      return this.renderFetching();
    }

    if (Object.entries(limitsMap).length < 1) {
      return this.renderEmptyList();
    }

    return (
      <div className="claim-list">
        <div className="claim-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Employee </th>
                <th scope="col">Cost Centre ID</th>
                <th scope="col">Approval Limit</th>
                <th></th>
              </tr>
            </thead>
            { this.renderEntries() }
          </table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication, policies } = state;
  const { employee } = authentication;
  const { limitsMap, managerOptions, errorAddApprovalLimit, isFetching } = policies;
  return {
    employee,
    limitsMap,
    managerOptions,
    errorAddApprovalLimit,
    isFetching
  };
}
export default withRouter(connect(mapStateToProps)(ApprovalLimitsList))
