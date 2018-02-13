import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class NewClaimForm extends React.Component {
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
  
  renderCompanyDropdownField(field) {
    const {meta: {touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
    return (
      <div className = {className}>
      <label>{field.label}</label>
      {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
      <select className="form-control" {...field.input}>
        <option value="" disabled> Select a company </option>
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
    const {meta: {touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
    return (
      <div className = {className}>
      <label>{field.label}</label>
      {/* the ... gets us everything associated with field.input such as onChange, onFocus, etc.*/}
      <select className="form-control" {...field.input}>
      <option value="" disabled> Select a cost center </option>
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
  //form for submit new claim initial items
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
      <Field
        label="14-digit Coast Capital Account Number"
        // name = what piece of state this field is going to produce
        name="ccaccountnumber"
        component={this.renderField}
        type="number"
        placeholder="14-digit Coast Capital Account Number"
      />
      {/*what is htmlFor for?*/}
      {/*<label htmlFor="nocoastacc">No Coast Capital Account</label>*/}
      <Field
        label="No Coast Capital Account"
        name="payroll"
        id="payroll"
        default={false}
        component={this.renderField}
        type="checkbox"
      />
      <Field
        label="Description"
        name="description"
        component={this.renderField}
        type="text"
        placeholder="Lunch"
      />
      
      <Field
        label="Company"
        name="companyid"
        component={this.renderCompanyDropdownField}>
      </Field>
      
      {/* <label>
        <Field name="sex" component="input" type="radio" value="male" />
        {' '}
        Male
        </label>
        <label>
        <Field name="sex" component="input" type="radio" value="female" />
        {' '}
        Female
      </label> */}
      <Field
        label="Cost Center"
        name="costcenter"
        component={this.renderCostCenterDropdownField}>
      </Field>
      <Field
        label="Notes"
        name="notes"
        component={this.renderTextAreaField}
        type="textarea"
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
  
  if (!/^(0|[1-9][0-9]{13})$/i.test(values.ccaccountnumber)){
    errors.ccaccountnumber = "Invalid account number!";
  }
  // if (!values.payroll){
  //     errors.payroll = "Please enter an account number or check this box!";
  // }
  if (!values.description){
    console.log("description is talking" + values.notes);
    errors.description = "Please enter a description!";
  }
  if (!values.companyid){
    console.log(values);
    console.log("companyid is talking" + values.costcenter);
    errors.companyid = "Please select a company!";
  }
  if (!values.costcenter){
    console.log(values);
    console.log("costcenter is talking" + values.companyid);
    errors.costcenter = "Please select a cost center! ";
  }
  if (!values.notes){
    console.log(values);
    console.log("notes is talking" + values.description);
    errors.notes = "Please enter some notes!";
  }
  
  
  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  
  return errors;
  
}

export default reduxForm({
  validate,
  form: 'NewClaimForm' // a unique identifier for this form
})(NewClaimForm);

//   render() {  
//     return (
//       <div className="claimlist-container">
//         <div className="page-header">
//           <div className="page-title">
//             {/* <form>
//               <input placeholder = "name" onKeyPress={this.handleKeyPress}/>

//               </form> */}
//            New Claim
//           </div>
//           <div className="page-route">
//             <span className="route-inactive">Home</span>  <span className="route-active"> > New Claim</span>
//           </div>

//         </div>
//         <form>
//           <label>
//             Account Number:
//             <input type="number" name="name" />
//           </label>
//           <label>
//             Company:
//             <input type="text" name="name" />
//           </label>
//           <label>
//             Description:
//             <input type="text" name="name" />
//           </label>
//           <label>
//             Cost Center:
//             <input type="text" name="name" />
//           </label>
//           <label>
//             Payroll:
//             <input type="checkbox" name="name" />
//           </label>


//           <button className="page-button" onClick={this.submitNewClaim}> Next
//             {/* <Link to="/newclaimitem"><i className="ion-android-time"></i>Next</Link>  */}
//           </button>
//         </form>

//       </div>


//     )
//   }
// }


// export default (NewClaim)
