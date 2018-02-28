import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { reportsActions, claimsActions } from '../actions';
import ReportsClaimList from './ReportsClaimList';

class ReportsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleParamChangeChecked = this.handleParamChangeChecked.bind(this);
    this.handleParamChangeText = this.handleParamChangeText.bind(this);
  }

  componentWillReceiveProps (nextprops) {
    console.log(nextprops);
    this.props.dispatch(claimsActions.requestWith(nextprops.params))
  }

  handleParamChangeChecked(e) {
    var value = e.target.checked == true ? e.target.checked : null
    var param_to_change = e.target.value;
    this.props.dispatch(reportsActions.modifyParams(param_to_change, value));
  }

  handleParamChangeText(e) {
    var value = e.target.value.length > 0 ? e.target.value : null
    var param_to_change = e.target.name;
    this.props.dispatch(reportsActions.modifyParams(param_to_change, value));
  }

  renderCheckBoxes() {
    return (
      <div className="reports">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="submitted" id="reports-submitted-check" onChange={this.handleParamChangeChecked}/>
          <label className="form-check-label" htmlFor="reports-submitted-check">
            Submitted
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="approved" id="reports-approved-check" onChange={this.handleParamChangeChecked}/>
          <label className="form-check-label" htmlFor="reports-approved-check">
            Approved
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="declined" id="reports-declined-check" onChange={this.handleParamChangeChecked}/>
          <label className="form-check-label" htmlFor="reports-declined-check">
            Declined
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="pending" id="reports-pending-check" onChange={this.handleParamChangeChecked}/>
          <label className="form-check-label" htmlFor="reports-pending-check">
            Pending
          </label>
        </div>
      </div>
      ) 
  }

  renderSearchByManagerOrEmployeeID() {
    return (
      <div className="reports">
        <div className="form-group reports-search">
          <input type="text" className="form-control" name="employee_id" id="reports-search-employee" placeholder="Employee ID" onChange={this.handleParamChangeText}/>
        </div>
        <div className="form-group reports-search">
          <input type="text" className="form-control" name="manager_id" id="reports-search-manager" placeholder="Manager ID" onChange={this.handleParamChangeText}/>
        </div>
      </div>
      )
  }

  renderCostCentreDropDown() {

  }

  renderDateRange() {
    return (
      <div className="reports">
        <div className="form-group reports-search">
          <input type="text" className="form-control" name="start" id="reports-date-from" label="From" placeholder="2018-01-01" onChange={this.handleParamChangeText}/>
        </div>
        <div className="form-group reports-search">
          <input type="text" className="form-control" name="end" id="reports-date-to" label="To" placeholder="2018-01-10" onChange={this.handleParamChangeText}/>
        </div>
      </div>
      )
  }

  renderClaimList() {
    return (
      <ReportsClaimList />
      )
  }

  render() {
    return (
      <div className="claimlist-container">
        <div className="page-header">
          <div className="page-title">
            Reports
          </div>
          <div className="page-route">
            <span className="route-inactive">Home</span>  <span className="route-active"> > Reports</span>
          </div>
        </div>
        {this.renderCheckBoxes()}
        {this.renderSearchByManagerOrEmployeeID()}
        {this.renderDateRange()}
        {this.renderClaimList()}
      </div>
      )
  }
}

function mapStateToProps(state) {
  const { authentication, reports } = state;
  const { employee } = authentication;
  const { params } = reports;
  console.log("in here!!!");
  return {
    employee,
    params
  };
}

export default withRouter(connect(mapStateToProps)(ReportsContainer))