import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

class NewApprovalLimitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
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

  handleSelectName(selectedOption) {
    this.setState({ selectedOption });
  }
  
  renderTextAreaField(field) {
    const { meta: {touched, error }} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    const options = this.props.employees.map((employee) => {
      return {value: employee.id, label: employee.employee_name}
    })
    const filterOptions = createFilterOptions({ options });
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

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

  renderCostCenterDropdownField(field) {
    const { meta: {touched, error }} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    const {cost_centres} = this.props

    return (
      <div className = {className}>
        <label>{field.label}</label>
        {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
        <select className="form-control" {...field.input}>
          <option value="" disabled> Select a cost center. </option>
          {
            cost_centres.map((cost_centre) => {
              let cost_centre_id = cost_centre.id
              return <option value={cost_centre_id} key={cost_centre_id}>{cost_centre_id}</option>
            })
          }
        </select>
        <div className="text-help">
          {touched ? error : ""}
        </div>
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
