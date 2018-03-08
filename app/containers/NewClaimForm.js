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
    const {cost_centres} = this.props;
    
    return (
      <div className = {className}>
        <label>{field.label}</label>
        {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
        <select className="form-control" {...field.input}>
          <option value="" disabled> Select a cost center. </option>
          {
            cost_centres.map((cost_centre) => {
              let cost_centre_id = cost_centre.id
              return <option value={cost_centre_id}>{cost_centre_id}</option>
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
          component={this.renderCompanyDropdownField}
        />
        <Field
          label="Cost Center:"
          name="cost_centre_id"
          component={this.renderCostCenterDropdownField.bind(this)}
        />
        <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Save Claim</button>
        <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}>Reset</button>
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
  if (!values.company_id) {
    errors.company_id = "Please select a company.";
  }
  if (!values.cost_centre_id) {
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
