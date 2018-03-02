import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { approvalLimitsActions } from '../actions';
import ApprovalLimit from '../components/ApprovalLimit';

class ApprovalLimitsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(approvalLimitsActions.requestAll());
  }

  renderApprovalLimits() {
    const { employee, limitsMap } = this.props;
    return (
      <div>
        <div className="page-header">
          <div className="page-title">
           Approval Limits
          </div>
          <div className="page-route">
            <span className="route-inactive">Home</span>  <span className="route-active"> > Approval Limits</span>
          </div>
        </div>
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
              <tbody>
                  {Object.entries(limitsMap).map((limits_tuple, i) => {
                    var limit_entry = limits_tuple[1]
                    return <ApprovalLimit employee={employee} limit_entry={ limit_entry } key = {i} />
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )
  }


  render() {
    return (
      <div className="claimlist-container">
         { this.renderApprovalLimits() }
      </div>
      )
  }
}

function mapStateToProps(state) {
  const { authentication, policies } = state;
  const { employee } = authentication;
  const { limitsMap, managerOptions } = policies;
  return {
    employee,
    limitsMap,
    managerOptions
  };
}

export default withRouter(connect(mapStateToProps)(ApprovalLimitsContainer))