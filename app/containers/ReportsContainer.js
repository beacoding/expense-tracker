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
    this.handlePayrollGeneration = this.handlePayrollGeneration.bind(this);    
  }

  componentWillReceiveProps(nextprops) {
    if (this.props.params !== nextprops.params) {
      this.props.dispatch(claimsActions.requestWith(nextprops.params))
    }
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

  handlePayrollGeneration(claims) {
    reportsHelpers.generatePayroll(claims);
  }

  handleAllEntriesGeneration(claims) {
    reportsHelpers.generateAllEntries(claims);
  }

  renderCheckBoxes() {
    return (
      <div className="reports-filter-row">
        <div className="form-check">
          <div><label>Filter by Claim Status:</label></div>
        </div>
        <div className="form-check">
          <label className="form-check-label no-select" htmlFor="reports-approved-check">
            <input defaultChecked={true} className="form-check-input" style={{width: 12 + 'px'}} type="checkbox" value="approved" id="reports-approved-check" onChange={this.handleParamChangeChecked}/>
            Approved
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label no-select" htmlFor="reports-declined-check">
            <input defaultChecked={true} className="form-check-input" style={{width: 12 + 'px'}} type="checkbox" value="declined" id="reports-declined-check" onChange={this.handleParamChangeChecked}/>
            Declined
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label no-select" htmlFor="reports-pending-check">
            <input defaultChecked={true} className="form-check-input" style={{width: 12 + 'px'}} type="checkbox" value="pending" id="reports-pending-check" onChange={this.handleParamChangeChecked}/>
            Under Review
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label no-select" htmlFor="reports-drafts-check">
            <input defaultChecked={true} className="form-check-input" style={{width: 12 + 'px'}} type="checkbox" value="drafts" id="reports-drafts-check" onChange={this.handleParamChangeChecked}/>
            Drafts
          </label>
        </div>
      </div>
      ) 
  }

  // renderSearchByManagerOrEmployeeID() {
  //   return (
  //     <div className="form-group reports-filter-row">
  //       <div className="form-group reports-search">
  //         <input type="text" className="form-control" name="employee_id" id="reports-search-employee" placeholder="Employee ID" onChange={this.handleParamChangeText}/>
  //       </div>
  //       <div className="form-group reports-search">
  //         <input type="text" className="form-control" name="manager_id" id="reports-search-manager" placeholder="Manager ID" onChange={this.handleParamChangeText}/>
  //       </div>
  //     </div>
  //     )
  // }

  renderSearchByManagerOrEmployeeName() {
    return (
      <div className="form-group">
        <div className="reports-filter-row">
          <div className="reports-search"><label>Filter by Claimant:</label></div>
          <div className="form-group reports-search">
            <input type="text" className="form-control" name="employee_name" id="reports-search-employee" placeholder="First or Last Name" onChange={this.handleParamChangeText}/>
          </div>
          <div className="reports-search"><label>or Approver:</label></div>        
          <div className="form-group reports-search">
            <input type="text" className="form-control" name="approver_name" id="reports-search-manager" placeholder="First or Last Name" onChange={this.handleParamChangeText}/>
          </div>
        </div>
      </div>
    )
  }

  renderDateRange() {
    return (
      <div className="form-group reports-filter-row">
        <div className="reports-search"><label>Created from</label></div>
        <div className="form-group reports-search">
          <input type="date" className="form-control" name="start" id="reports-date-from" label="From" placeholder="YYYY-MM-DD" onChange={this.handleParamChangeText}/>
        </div>
        <div className="reports-search"><label>to</label></div>
        <div className="form-group reports-search">
          <input type="date" className="form-control" name="end" id="reports-date-to" label="To" placeholder="YYYY-MM-DD" onChange={this.handleParamChangeText}/>
        </div>
      </div>
    )
  }

  renderClaimList() {
    return (
      <ReportsClaimList handleT24Generation={this.handleT24Generation}
                        handlePayrollGeneration={this.handlePayrollGeneration}
                        handleAllEntriesGeneration={this.handleAllEntriesGeneration}/>
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
          {this.renderSearchByManagerOrEmployeeName()}
          {/* {this.renderSearchByManagerOrEmployeeID()} */}
          {this.renderDateRange()}
          {this.renderCheckBoxes()}
        </div>
        <div>
          {this.renderClaimList()}
        </div>
        
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