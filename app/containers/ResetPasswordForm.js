import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class ResetPasswordForm extends React.Component {
    constructor(props) {
      super(props);
    }
    
    renderNewPassword(field){
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
    // form for submit new claim initial items
    render () {
      const { handleSubmit, pristine, reset, submitting } = this.props;
      return (
        <form onSubmit={handleSubmit}>
        <Field
            label="New Password:"
            name="new_password"
            type="password"
            placeholder="New Password"
            component={this.renderNewPassword}
        />
        <div className="buttons-row">
          <button type="submit" className="btn page-button-blue" disabled={pristine || submitting}>Submit</button>
        </div>
        </form>
      );
    }
}

export default reduxForm({
    // validate,
    form: 'ResetPasswordForm' // a unique identifier for this form
  })(ResetPasswordForm);

