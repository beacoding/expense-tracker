import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

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

  handleBlur() {
    // do nothing...
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
        />
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

  renderIdField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className = {className}>
        <label>{field.label}</label>
        {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
        <input id="id" className="form-control" placeholder={field.placeholder} type={field.type} {...field.input} min={field.min} step={field.step} />
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

export default reduxForm({
  form: 'NewUserForm' // a unique identifier for this form
})(NewUserForm);
