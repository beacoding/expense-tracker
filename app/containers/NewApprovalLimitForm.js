import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';

class NewApprovalLimitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedManager: '',
      selectedCostCentre: ''
    }
  }
  
  renderField(field) {
    const { meta: { touched, error }} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
    return (
      <div className = {className}>
        <label>{field.label}</label>
        {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
        <input className="form-control" placeholder={field.placeholder} type={field.type} {...field.input} max={field.max} maxLength={field.maxLength} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  handleSelectName(manager) {
    this.setState({ selectedManager: manager });
  }
  
  renderTextAreaField(field) {
    const { meta: {touched, error }} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    const options = this.props.employees.map((employee) => {
      return {value: employee.id, label: employee.employee_name}
    })
    const filterOptions = createFilterOptions({ options });
    const { selectedManager } = this.state;
    const value = selectedManager && selectedManager.value;

    return (  
      <div className = {className}>
        <label>{field.label}</label>
        <Select
          value={value}
          options={options}
          filterOptions={filterOptions}
          onChange={this.handleSelectName.bind(this)}
          {...field.input}
          onBlur={() => {}}
        />
      </div>
   );
  }

  handleSelectCostCentre(cost_centre) {
    this.setState({ selectedCostCentre: cost_centre });
  }

  renderCostCenterDropdownField(field) {
    const { meta: {touched, error }} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    const options = this.props.cost_centres.map((cost_centre) => {
      return {value: cost_centre.id, label: cost_centre.id}
    })
    const filterOptions = createFilterOptions({ options });
    const { selectedCostCentre } = this.state;
    const value = selectedCostCentre && selectedCostCentre.value;

    return (  
      <div className = {className}>
        <label>{field.label}</label>
        <Select
          value={value}
          options={options}
          filterOptions={filterOptions}
          onChange={this.handleSelectCostCentre.bind(this)}
          {...field.input}
          onBlur={() => {}}
        />
      </div>
   );
  }
  
  // form for submit new claim initial items
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          label="Employee"
          name="employee"
          component={this.renderTextAreaField.bind(this)}
        />
        <Field
          label="Cost Centre"
          name="cost_centre_id"
          component={this.renderCostCenterDropdownField.bind(this)}
        />
        <Field
          label="Approval Limit (CAD)"
          name="amount"
          component={this.renderField}
          type="number"
          min={0}
          step={0.01}
        />
        <div className="buttons-row">
          <button type="submit" className="btn page-button-blue" disabled={pristine || submitting}>Save</button>
          <button type="button" className="btn page-button-red" disabled={pristine || submitting} onClick={reset}>Reset</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'NewApprovalLimitForm' // a unique identifier for this form
})(NewApprovalLimitForm);
