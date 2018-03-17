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
    const { input, type, accept, meta: { touched, error, warning } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    delete input.value;

    return (
      <div className={className}>
        <div>
          <label>{field.label} <input className="form-control" {...input} type={type} accept={accept}/> </label>   
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
        <i className="ion-android-alert"> Only check this box if you do not have a receipt.</i>
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
    const { expense_types } = this.props;

    return (
      <div className = {className}>
      <label>{field.label}</label>
      {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
      <select className="form-control" {...field.input}>
      <option value="" disabled> Select an expense category. </option>
      {
        expense_types.map((expense_type) => {
          let expense_type_id = expense_type.id;
          let expense_type_category = expense_type.category;
          return <option value={expense_type_id} key={expense_type_id}>{expense_type_category}</option>
        })
      }
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
          accept="image/*"
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
          component={this.renderExpenseTypeDropdownField.bind(this)}
        />
        <Field
          label="Comments:"
          name="comment"
          type="textarea"
          component={this.renderTextAreaField}
        />
        <div className="buttons-row">
          <button type="submit" className="btn page-button-blue" disabled={pristine || submitting}>Save Claim Item</button>
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
