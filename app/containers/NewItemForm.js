import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class NewItemForm extends React.Component {
  constructor(props) {
    super(props);
  }
  
  renderField(field) {
    const {meta: {touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
    return (
      <div className = {className}>
      <label>{field.label}</label>
      {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
      <input className="form-control" placeholder={field.placeholder} type={field.type} {...field.input} />
      <div className="text-help">
      {touched ? error : ""}
      </div>
      </div>
    );
  }
  
  renderTextAreaField(field) {
    const {meta: {touched, error } } = field;
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
    const {meta: {touched, error } } = field;
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
      <option value={4}>Conference fee</option>
      <option value={5}>Delight the customer</option>
      <option value={6}>Fund for fun</option>
      <option value={7}>Golf</option>
      <option value={8}>Hotel</option>
      <option value={9}>Meals & Entertainment staff</option>
      <option value={10}>Meals & entertainment promo</option>
      <option value={11}>Meetings</option>
      <option value={12}>Mileae</option>
      <option value={13}>Other</option>
      <option value={14}>Parking</option>
      <option value={15}>Personal/Professional dues, membership</option>
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
    const { handleSubmit, pristine, reset, submitting } = this.props;
    
    return (
      <form onSubmit={handleSubmit}>
      <Field
        label="Description"
        name="description"
        component={this.renderField}
        type="text"
        placeholder="Travelling to Tatooine"
      />
      <Field
        label="Amount (CAD)"
        name="amount"
        id="amount"
        component={this.renderField}
        type="number"
      />
      <Field
        label="Has Receipt?"
        name="hasreceipt"
        default={false}
        component={this.renderField}
        type="checkbox"
        default={0}
      />
      <Field
        label="Expense Type"
        name="expensetype"
        component={this.renderExpenseTypeDropdownField}
      />
      <Field
        label="Comments"
        name="comment"
        type="textarea"
        component={this.renderTextAreaField}
      />
      <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
      <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}>
      Clear Values
      </button>
      </form>
    );
  }
}

function validate(values){
  // create empty errors object to return

  const errors = {};

  // validate the inputs from 'values'

  if (!values.description){
    errors.description = "Please enter a description!";
  }
  if (!values.amount){
    errors.amount = "Please enter an amount!";
  }
  if (!values.hasreceipt){
    errors.hasreceipt = "Please upload a receipt or check the box! ";
  }
  if (!values.expensetype){
    errors.expensetype = "Please select an expense type!";
  }
  if (!values.comment){
    errors.comment = "Please a comment!";
  }


  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  form: 'NewItemForm', // a unique identifier for this form
})(NewItemForm);
