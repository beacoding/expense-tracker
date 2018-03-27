import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedManager: '',
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

  handleSelectName(selectedManager) {
    this.setState({ selectedManager });
  }
  
  renderManagerSelectField(field) {
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
          <div className="text-help">
            {touched ? error : ""}
          </div>
      </div>
   );
  }

  renderCheckbox(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <div>
          <label>{field.label} <input type="checkbox" style={{width: 12 + 'px', marginLeft: 5 + 'px'}} {...field.input} /></label>
        </div>
        <div className="text-help">
          {touched ? error : ""}
        </div>
        <br/>
      </div>
    )
  }

  renderIdField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className = {className}>
        <label>{field.label}</label>
        {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
        <input id="id" className="form-control" placeholder={field.placeholder} type={field.type} {...field.input} min={field.min} max={field.max} step={field.step} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }
  
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
          <Field
            label="Employee ID:"
            name="id"
            component={this.renderIdField}
            type="number"
            min={0}
            step={1}
          />
        <Field
          label="First Name:"
          name="first_name"
          component={this.renderField}
          type="text"
          placeholder=""
        />
        <Field
          label="Last Name:"
          name="last_name"
          component={this.renderField}
          type="text"
          placeholder=""
        />
        <Field
          label="Email Address:"
          name="email"
          component={this.renderField}
          type="text"
          placeholder="This will also serve as the employee's username."
        />
        <Field
          label="Password:"
          name="password"
          component={this.renderField}
          type="password"
          placeholder=""
        />
        <Field
          label="Manager:"
          name="manager_id"
          component={this.renderManagerSelectField.bind(this)}
        />
        <Field
          label="System Administrator?"
          name="is_admin"
          checked={false}
          component={this.renderCheckbox}
        />
        <div className="buttons-row">
          <button type="submit" className="btn page-button-blue" disabled={pristine || submitting}>Submit</button>
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
  if (!values.id || (values.id && !/^[0-9]{1,10}$/.test(values.id))) {
    errors.id = "Please enter this user's unique employee ID (up to 11 digits).";
  }
  if (!values.first_name || values.first_name.trim().length == 0) {
    errors.first_name = "Please enter the user's first name.";
  }
  if (!values.last_name || values.last_name.trim().length == 0) {
    errors.last_name = "Please enter the user's last name.";
  }
  if (!values.email || values.email.trim().length == 0 || (values.email && !/\S+@\S+\.\S+/.test(values.email))) {
    errors.email = "Please enter this user's unique email address.";
  }
  if (!values.password || values.password.trim().length == 0) {
    errors.password = "Please provide a password for this user.";
  }
  if (!values.manager_id || values.manager_id === null) {
    errors.manager_id = "Please assign a manager to this user.";
  }

  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'NewUserForm' // a unique identifier for this form
})(NewUserForm);
