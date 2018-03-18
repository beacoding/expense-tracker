import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
// import { Form, FormGroup, Col, Button, FormControl } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
class PasswordForm extends React.Component {
    constructor(props) {
      super(props);
      const old__pw = this.props;
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
    renderOldPassword(field) {
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
      const { handleSubmit, pristine, reset, submitting, old_password } = this.props;
      return (
        <form onSubmit={handleSubmit}>
            <Field
            label="Old Password:"
            name="old_password"
            type="password"
            placeholder={old_password}
            component={this.renderOldPassword}
        />
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

// function validate(values, old_pw) {
//     // create empty errors object to return
//     const errors = {};
 
  
//     // validate the inputs from 'values'
//     if(values.old_password != old_pw.old_password){
//         errors.wrong_password = "Incorrect password"
//     }
//     if(!values.new_password){
//         errors.no_password = "Please enter a new password"
//     }
  
//     // if errors is empty, the form is fine to submit
//     // if errors has any properties, redux form assumes form is invalid
//     return errors;
//   }
export default reduxForm({
    // validate,
    form: 'PasswordForm' // a unique identifier for this form
  })(PasswordForm);




//  <Form horizontal>
//         <FormGroup controlId="formHorizontalEmail"
//                    validationState={this.getValidationState()}>
//             <Col componentClass='form' sm={2}>
//             Old Password
//             </Col>
//             <Col sm={10}>
//             <FormControl type="password" placeholder={old_password} />
//             </Col>
//         </FormGroup>

//         <FormGroup controlId="formHorizontalPassword">
//             <Col componentClass='form' sm={2}>
//             New Password
//             </Col>
//             <Col sm={10}>
//             <FormControl type="password" placeholder="New assword" />
//             </Col>
//         </FormGroup>

//         <FormGroup>
//             <Col smOffset={2} sm={10}>
//             <Button type="submit">OK</Button>
//             </Col>
//         </FormGroup>
//     </Form>