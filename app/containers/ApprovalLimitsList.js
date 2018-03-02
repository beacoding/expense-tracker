import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { approvalLimitsActions } from '../actions';
import ApprovalLimit from '../components/ApprovalLimit';

class ApprovalLimitsList extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditLimit = this.handleEditLimit.bind(this);
  }
    
  componentDidMount() {
    this.props.dispatch(approvalLimitsActions.requestWith({}));
  }

  handleEditLimit(employee_id, cost_centre_id, data) {
    this.props.dispatch(approvalLimitsActions.updateApprovalLimit(employee_id, cost_centre_id, data["new_approval_limit"]))
  }

  renderEntries() {
    const { employee, limitsMap } = this.props;
    return (
      <tbody>
      {Object.entries(limitsMap).map((limits_tuple, i) => {
        var limit_entry = limits_tuple[1]
        return <ApprovalLimit handleEditLimit={this.handleEditLimit} employee={employee} limit_entry={ limit_entry } key = {i} />
      })}
      </tbody>
      )
  }

  render() {
    
    return (
      <div className="claim-list">
        <div className="claim-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"> ID </th>
                <th scope="col"> Employee </th>
                <th scope="col">Cost Centre ID</th>
                <th scope="col">Approval Limit</th>
              </tr>
            </thead>
              { this.renderEntries() }
          </table>
        </div>
      </div>    )
  }
}

function mapStateToProps(state) {
  const { authentication, policies } = state;
  const { employee } = authentication;
  const { limitsMap, managerOptions } = policies;
  return {
    employee,
    limitsMap,
    managerOptions,
  };
}
export default withRouter(connect(mapStateToProps)(ApprovalLimitsList))
