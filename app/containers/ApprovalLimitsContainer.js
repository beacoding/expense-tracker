import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { approvalLimitsActions } from '../actions';
import ApprovalLimit from '../components/ApprovalLimit';
import ApprovalLimitsList from './ApprovalLimitsList';

class ApprovalLimitsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleParamChangeText = this.handleParamChangeText.bind(this);
  }

  componentWillReceiveProps (nextprops) {
    this.props.dispatch(approvalLimitsActions.requestWith(nextprops.params))
  }

  handleParamChangeText(e) {
    var value = e.target.value.length > 0 ? e.target.value : null
    var param_to_change = e.target.name;
    this.props.dispatch(approvalLimitsActions.modifyParams(param_to_change, value));
  }

  renderSearchByEmployeeOrCostCentre() {
    return (
      <div className="reports">
        <div className="form-group reports-search">
          <input type="text" className="form-control" name="employee_id" id="reports-search-employee" placeholder="Employee ID" onChange={this.handleParamChangeText}/>
        </div>
        <div className="form-group reports-search">
          <input type="text" className="form-control" name="employee_name" id="reports-search-manager" placeholder="Employee Name" onChange={this.handleParamChangeText}/>
        </div>
        <div className="form-group reports-search">
          <input type="text" className="form-control" name="cost_centre_id" id="reports-search-employee" placeholder="Cost Centre ID" onChange={this.handleParamChangeText}/>
        </div>
      </div>
      )
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
        { this.renderSearchByEmployeeOrCostCentre() }
        <ApprovalLimitsList />
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
  const { managerOptions, params } = policies;
  return {
    employee,
    managerOptions,
    params
  };
}

export default withRouter(connect(mapStateToProps)(ApprovalLimitsContainer))