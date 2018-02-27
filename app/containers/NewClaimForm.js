import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class NewClaimForm extends React.Component {
  constructor(props) {
    super(props);
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

  renderCheckbox(field) {
    const { meta: { touched, error }} = field;
    const className = `${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <div>
          <label>{field.label} <input type="checkbox" style={{marginLeft: 5 + 'px'}} {...field.input} /></label>
        </div>
        <br/>
      </div>
    )
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
  
  renderCompanyDropdownField(field) {
    const { meta: {touched, error }} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
    return (
      <div className = {className}>
        <label>{field.label}</label>
        {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
        <select className="form-control" {...field.input}>
          <option value="" disabled> Select a company. </option>
          <option value={1}>CCFM - Financial Management</option>
          <option value={2}>CCSCU - Banking</option>
          <option value={3}>TFL - Travelers Finance LTD</option>
        </select>
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }
  
  renderCostCenterDropdownField(field) {
    const { meta: {touched, error }} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
    return (
      <div className = {className}>
        <label>{field.label}</label>
        {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
        <select className="form-control" {...field.input}>
          <option value="" disabled> Select a cost center. </option>
          <option value={500}>500</option>
          <option value={505}>505</option>
          <option value={538}>538</option>
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
        label="14-digit Coast Capital Account Number"
        // name = what piece of state this field is going to produce
        name="account_number"
        component={this.renderField}
        type="number"
        placeholder="XXXXXXXXXXXXXX"
        max={99999999999999}
        maxLength={14}
      />
      <Field
        label="No Coast Capital Account"
        name="no_account_number"
        checked={false}
        component={this.renderCheckbox}
      />
      <Field
        label="Description"
        name="description"
        component={this.renderField}
        type="text"
        placeholder="Enter a descriptive title for your claim."
      />
      <Field
        label="Company"
        name="company_id"
        component={this.renderCompanyDropdownField}
      />
      <Field
        label="Cost Center"
        name="cost_centre_id"
        component={this.renderCostCenterDropdownField}
      />
      <Field
        label="Notes"
        name="notes"
        component={this.renderTextAreaField}
        type="textarea"
      />
      <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
      <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </form>
    );
  }
}

function validate(values) {
  // create empty errors object to return
  const errors = {};

  // validate the inputs from 'values'
  if (!/^(0|[1-9][0-9]{13})$/i.test(values.account_number)) {
    errors.account_number = "Please provide your 14-digit account number.";
  }
  if (!values.description || values.description.trim().length == 0) {
    errors.description = "Please provide a description for your claim.";
  }
  if (!values.company_id) {
    errors.company_id = "Please select a company.";
  }
  if (!values.cost_centre_id) {
    errors.cost_centre_id = "Please select a cost center.";
  }
  if (!values.notes) {
    errors.notes = "Please provide some context for your claim.";
  }

  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'NewClaimForm' // a unique identifier for this form
})(NewClaimForm);
