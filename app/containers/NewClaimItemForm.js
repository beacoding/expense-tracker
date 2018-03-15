import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class NewClaimItemForm extends React.Component {
  constructor(props) {
    super(props);
  }
  
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className = {className}>
        <label>{field.label}</label>
        {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
        <input className="form-control" placeholder={field.placeholder} type={field.type} {...field.input} min={field.min} step={field.step} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderFileInput(field) {
    const { input, type, meta: { touched, error, warning } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    delete input.value;

    return (
      <div className={className}>
        <div>
          <label>{field.label} <input className="form-control" {...input} type={type}/> </label>   
        </div>
      </div>
    );
  }

  renderCheckbox(field) {
    const { meta: { touched, error } } = field;
    const className = `${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <div>
          <label>{field.label} <input type="checkbox" style={{marginLeft: 5 + 'px'}} {...field.input} /></label>
        </div>
        <div className="text-help">
          {touched ? error : ""}
        </div>
        <br/>
      </div>
    )
  }
  
  renderTextAreaField(field) {
    const { meta: { touched, error } } = field;
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
  
  renderExpenseTypeDropdownField(field) {
    const { meta: {touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
    return (
      <div className = {className}>
      <label>{field.label}</label>
      {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
      <select className="form-control" {...field.input}>
      <option />
      <option value={1}>Auto Gas</option>
      <option value={2}>Auto Repairs</option>
      <option value={3}>Books & Subscriptions</option>
      <option value={4}>Conference Fee</option>
      <option value={5}>Delight the Customer</option>
      <option value={6}>Fund for Fun</option>
      <option value={7}>Golf</option>
      <option value={8}>Hotel</option>
      <option value={9}>Meals & Entertainment Staff</option>
      <option value={10}>Meals & Entertainment Promo</option>
      <option value={11}>Meetings</option>
      <option value={12}>Mileage</option>
      <option value={13}>Other</option>
      <option value={14}>Parking</option>
      <option value={15}>Personal/Professional Dues, Membership</option>
      <option value={16}>Prizes</option>
      <option value={17}>Telephone</option>
      <option value={18}>Travel</option>
      </select>
      <div className="text-help">
      {touched ? error : ""}
      </div>
      </div>
    );
  }
  
  //form for submit new claim initial items
  render () {
    const { handleSubmit, pristine, reset, submitting, initialValues } = this.props;
    return (
      <form initialValues={initialValues}  onSubmit={handleSubmit}>
        <Field
          label="Description:"
          name="description"
          component={this.renderField}
          type="text"
          placeholder="Enter a description for this item."
        />
        <Field
          label="Amount (CAD):"
          name="amount"
          component={this.renderField}
          type="number"
          min={0}
          step={0.01}
        />
        <Field 
          label="Upload Receipt"
          name="receipt" 
          component={this.renderFileInput} 
          type="file" 
        />
        <Field
          label="No Receipt?"
          name="no_receipt"
          checked={false}
          component={this.renderCheckbox}
        />
        <Field
          label="Expense Type:"
          name="expense_type"
          component={this.renderExpenseTypeDropdownField}
        />
        <Field
          label="Comments:"
          name="comment"
          type="textarea"
          component={this.renderTextAreaField}
        />
        <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Save Claim Item</button>
        <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}>Reset</button>
      </form>
    );
  }
}

function validate(values) {
  // create empty errors object to return
  const errors = {};

  // validate the inputs from 'values'
  if (!values.description || values.description.trim().length == 0) {
    errors.description = "Please provide a description for this item.";
  }
  if (!values.amount) {
    errors.amount = "Please enter an amount.";
  }
  if (!values.receipt && !values.no_receipt) {
    errors.no_receipt = "Please upload a copy of your receipt or check the 'No Receipt' box.";
  }
  if (!values.expense_type) {
    errors.expense_type = "Please select an expense type.";
  }
  if (!values.comment || values.comment.trim().length == 0) {
    errors.comment = "Please provide some context for this item.";
  }

  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(state, ownProps) {
  console.log(ownProps.currentValues, "jlqeklr")
  return {
    initialValues: ownProps.currentValues
  }
}


export default reduxForm({
  validate,
  form: 'NewClaimItemForm' // a unique identifier for this form
}, mapStateToProps)(NewClaimItemForm);
