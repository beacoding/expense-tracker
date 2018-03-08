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
    var value = e.target.checked == true ? e.target.checked : false
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
      <div className="reports-filter-row">
        <div className="form-check">
          <label className="form-check-label no-select" htmlFor="reports-approved-check">
            <input defaultChecked={true} className="form-check-input" type="checkbox" value="approved" id="reports-approved-check" onChange={this.handleParamChangeChecked}/>
            Approved
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label no-select" htmlFor="reports-declined-check">
            <input defaultChecked={true} className="form-check-input" type="checkbox" value="declined" id="reports-declined-check" onChange={this.handleParamChangeChecked}/>
            Declined
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label no-select" htmlFor="reports-pending-check">
            <input defaultChecked={true} className="form-check-input" type="checkbox" value="pending" id="reports-pending-check" onChange={this.handleParamChangeChecked}/>
            Pending
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label no-select" htmlFor="reports-drafts-check">
            <input defaultChecked={true} className="form-check-input" type="checkbox" value="drafts" id="reports-drafts-check" onChange={this.handleParamChangeChecked}/>
            Drafts
          </label>
        </div>
      </div>
      ) 
  }

  renderSearchByManagerOrEmployeeID() {
    return (
      <div className="reports-filter-row">
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
      <div className="reports-filter-row">
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
      <div className="reports-filter-row">
        <div className="form-group reports-search">
          <input type="date" className="form-control" name="start" id="reports-date-from" label="From" placeholder="2018-01-01" onChange={this.handleParamChangeText}/>
        </div>
        <div className="form-group reports-search">
          <input type="date" className="form-control" name="end" id="reports-date-to" label="To" placeholder="2018-03-31" onChange={this.handleParamChangeText}/>
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
            Files and Reports
          </div>
          <div className="page-route">
            <span className="route-inactive">Home > Admin</span>  <span className="route-active"> > Files and Reports</span>
          </div>
        </div>
        <div className="reports-filter-container">
          {this.renderCheckBoxes()}
          {this.renderSearchByManagerOrEmployeeID()}
          {this.renderSearchByManagerOrEmployeeName()}
          {this.renderDateRange()}
        </div>
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