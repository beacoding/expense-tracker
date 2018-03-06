import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { approvalLimitsActions, employeesActions } from '../actions';
import ApprovalLimit from '../components/ApprovalLimit';
import ApprovalLimitsList from './ApprovalLimitsList';
import NewApprovalLimitModal from './NewApprovalLimitModal';
import { Field, reduxForm } from 'redux-form';
import { modal } from 'react-redux-modal';

class ApprovalLimitsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleParamChangeText = this.handleParamChangeText.bind(this);
    this.handleAddLimit = this.handleAddLimit.bind(this);
    this.showNewApprovalLimitModal = this.showNewApprovalLimitModal.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(approvalLimitsActions.findAllCostCentres())
    this.props.dispatch(employeesActions.requestAll())
  }

  componentWillReceiveProps (nextprops) {
    this.props.dispatch(approvalLimitsActions.requestWith(nextprops.params))
  }

  handleParamChangeText(e) {
    var value = e.target.value.length > 0 ? e.target.value : null
    var param_to_change = e.target.name;
    this.props.dispatch(approvalLimitsActions.modifyParams(param_to_change, value));
  }

  handleAddLimit(data) {
    const { employee, form } = this.props;
    const approvalLimit  = {
      employee_id: form.NewApprovalLimitForm.values.employee.value,
      approval_limit: parseFloat(data.amount),
      cost_centre_id: parseInt(form.NewApprovalLimitForm.values.cost_centre_id),
    }
    this.props.dispatch(approvalLimitsActions.addApprovalLimit(approvalLimit)).then(() => {
      modal.clear();
    });;
  }

  showNewApprovalLimitModal(){
    modal.add( NewApprovalLimitModal, {
      title: 'Add Approval Limit',
      size: 'medium', // large, medium or small,
      closeOnOutsideClick: false ,// (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideTitleBar: false ,// (optional) Switch to true if do not want the default title bar and close button,
      hideCloseButton: false, // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;)
      onSubmitFunction: this.handleAddLimit,
      cost_centres: this.props.cost_centres,
      employees: this.props.users
    });
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

  renderReportsButtons() {
    return (
      <div className="reports-buttons-row">
        <button className="page-button" onClick={this.showNewApprovalLimitModal}> Add New Limit </button>
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
        { this.renderReportsButtons() }
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
  const { authentication, policies, form, employees } = state;
  const { employee } = authentication;
  const { managerOptions, params, cost_centres } = policies;
  const users = employees.employees;
  return {
    form,
    employee,
    managerOptions,
    params,
    cost_centres,
    users,
  };
}

export default withRouter(connect(mapStateToProps)(ApprovalLimitsContainer))