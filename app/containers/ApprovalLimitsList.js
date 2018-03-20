import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal';
import { approvalLimitsActions } from '../actions';
import ApprovalLimit from '../components/ApprovalLimit';
import ModalContainer from './ModalContainer'
import {toastr} from 'react-redux-toastr';
import {toastrHelpers} from '../helpers';

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
    this.props.dispatch(approvalLimitsActions.updateApprovalLimit(employee_id, cost_centre_id, data["new_approval_limit"]));
  }

  confirmRevokeLimit(employee_id, cost_centre_id) {
    this.props.dispatch(approvalLimitsActions.revokeApprovalLimit(employee_id, cost_centre_id)).then((res) => {
      if (res.type === "SUCCESS_REVOKE_APPROVAL_LIMIT") {
        toastr.removeByType("error");
        toastr.success('Approval limit has been successfully revoked');
      } else {
        toastr.removeByType("error");
        toastr.error('Approval limit has not been revoked', 'Please try again', toastrHelpers.getErrorOptions())
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

  render() {
    const { errorAddApprovalLimit } = this.props;

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
  const { limitsMap, managerOptions, errorAddApprovalLimit } = policies;
  return {
    employee,
    limitsMap,
    managerOptions,
    errorAddApprovalLimit
  };
}
export default withRouter(connect(mapStateToProps)(ApprovalLimitsList))
