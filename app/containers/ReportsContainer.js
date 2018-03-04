import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { reportsActions, claimsActions } from '../actions';
import ReportsClaimList from './ReportsClaimList';
import { reportsHelpers } from '../helpers';

class ReportsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleParamChangeChecked = this.handleParamChangeChecked.bind(this);
    this.handleParamChangeText = this.handleParamChangeText.bind(this);
    this.handleT24Generation = this.handleT24Generation.bind(this);
  }

  componentWillReceiveProps (nextprops) {
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

  handleT24Generation(claims) {
    reportsHelpers.generateT24(claims);
  }

  renderCheckBoxes() {
    return (
      <div className="reports">
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

  renderSearchByManagerOrEmployeeName() {
    return (
      <div className="reports">
        <div className="form-group reports-search">
          <input type="text" className="form-control" name="employee_first_name" id="reports-search-employee" placeholder="Employee First Name" onChange={this.handleParamChangeText}/>
        </div>
        <div className="form-group reports-search">
          <input type="text" className="form-control" name="employee_last_name" id="reports-search-employee" placeholder="Employee Last Name" onChange={this.handleParamChangeText}/>
        </div>
        <div className="form-group reports-search">
          <input type="text" className="form-control" name="manager_first_name" id="reports-search-manager" placeholder="Manager First Name" onChange={this.handleParamChangeText}/>
        </div>
        <div className="form-group reports-search">
          <input type="text" className="form-control" name="manager_last_name" id="reports-search-manager" placeholder="Manager Last Name" onChange={this.handleParamChangeText}/>
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
          <input type="date" className="form-control" name="start" id="reports-date-from" label="From" placeholder="From:" onChange={this.handleParamChangeText}/>
        </div>
        <div className="form-group reports-search">
          <input type="date" className="form-control" name="end" id="reports-date-to" label="To" placeholder="To:" onChange={this.handleParamChangeText}/>
        </div>
      </div>
    )
  }

  renderClaimList() {
    return (
      <ReportsClaimList handleT24Generation={this.handleT24Generation}/>
    )
  }

  render() {
    return (
      <div className="claimlist-container">
        <div className="page-header">
          <div className="page-title">
            Reports and Files
          </div>
          <div className="page-route">
            <span className="route-inactive">Home</span>  <span className="route-active"> > Reports and Files</span>
          </div>
        </div>
        {this.renderCheckBoxes()}
        {this.renderSearchByManagerOrEmployeeID()}
        {this.renderSearchByManagerOrEmployeeName()}
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
  return {
    employee,
    params
  };
}

export default withRouter(connect(mapStateToProps)(ReportsContainer))