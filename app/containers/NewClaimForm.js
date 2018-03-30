import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';

class NewClaimForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompany: '',
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
        <input className="form-control" placeholder={field.placeholder} type={field.type} {...field.input} autoComplete="off" max={field.max} maxLength={field.maxLength} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }
  
  renderTextAreaField(field) {
    const { meta: {touched, error }} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
    return (
      <div className = {className}>
        <label>{field.label}</label>
        {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
        <textarea className="form-control" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  handleSelectCompany(company) {
    this.setState({ selectedCompany: company });
  }

  renderCompanyDropdownField(field) {
    const { meta: {touched, error }} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    const options = this.props.companies.map((company) => {
      return {value: company.id, label: company.name}
    })
    const filterOptions = createFilterOptions({ options });
    const { selectedCompany } = this.state;
    const value = selectedCompany && selectedCompany.value;

    return (  
      <div className = {className}>
        <label>{field.label}</label>
        <Select
          value={value}
          options={options}
          filterOptions={filterOptions}
          onChange={this.handleSelectCompany.bind(this)}
          {...field.input}
          onBlur={() => {}}
        />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
   );
  }
  
  handleSelectCostCentre(cost_centre) {
    this.setState({ selectedCostCentre: cost_centre });
  }

  renderCostCentreDropdownField(field) {
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
          label="14-digit Coast Capital Account Number:"
          // name = what piece of state this field is going to produce
          name="account_number"
          component={this.renderField}
          type="text"
          placeholder="XXXXXXXXXXXXXX"
          maxLength={14}
        />
        <div className="form-group">
          <i className="ion-android-alert"> Leave this blank if you do not have a Coast Capital account.</i>
          <br/>
        </div>
        <Field
          label="Description:"
          name="description"
          component={this.renderField}
          type="text"
          placeholder="Enter a descriptive title for your claim."
        />
        <Field
          label="Company:"
          name="company_id"
          component={this.renderCompanyDropdownField.bind(this)}
        />
        <Field
          label="Cost Center:"
          name="cost_centre_id"
          component={this.renderCostCentreDropdownField.bind(this)}
        />
        <div className="buttons-row">
          <button type="submit" className="btn page-button-blue" disabled={pristine || submitting}>Save Claim</button>
          <button type="button" className="btn page-button-red" disabled={pristine || submitting} onClick={reset}>Reset</button>
        </div>
      </form>
    );
  }
}

function validate(values) {
  // create empty errors object to return
  const errors = {};

  // validate the inputs from 'values'
  if (values.account_number && (!/^\d{14}$/.test(values.account_number))) {
    errors.account_number = "Please ensure your account number has 14-digits.";
  }
  if (!values.description || values.description.trim().length == 0) {
    errors.description = "Please provide a description for your claim.";
  }
  if (!values.company_id || values.company_id === null) {
    errors.company_id = "Please select a company.";
  }
  if (!values.cost_centre_id || values.company_id === null) {
    errors.cost_centre_id = "Please select a cost center.";
  }

  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'NewClaimForm' // a unique identifier for this form
})(NewClaimForm);
