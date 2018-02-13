import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class NewClaimForm extends React.Component {
  constructor(props) {
      super(props);
  }


//form for submit new claim initial items
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Coast Account Number</label>
          <div>
            <Field
              name="ccaccountnumber"
              component="input"
              type="number"
              placeholder="14 digit Coast Capital account"
            />
          </div>
        </div>
        <div>
          <label htmlFor="nocoastacc">No Coast Capital Account</label>
          <div>
            <Field
              name="payroll"
              id="payroll"
              default={false}
              component="input"
              type="checkbox"
            />
          </div>
        </div>
        <div>
          <label>Description</label>
          <div>
            <Field
              name="description"
              component="input"
              type="text"
              placeholder="Lunch"
            />
          </div>
        </div>
        <div>
          <label>Company</label>
          <div>
          <Field name="companyid" component="select">
              <option />
              <option value={1}>CCFM- Financial Management</option>
              <option value={2}>CCSCU- Banking</option>
              <option value={3}>TFL-Travelers Finance LTD</option>
            </Field>
          </div>
        </div>
        <div>
          <label></label>
          <div>
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
          </div>
        </div>
        <div>
          <label>Cost Center</label>
          <div>
            <Field name="costcenter" component="select">
              <option />
              <option value={500}>500</option>
              <option value={600}>600</option>
              <option value={501}>501</option>
            </Field>
          </div>
        </div>
       
        <div>
          <label>Notes</label>
          <div>
            <Field name="notes" component="textarea" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
   }
  }

  export default reduxForm({
    form: 'NewClaimForm', // a unique identifier for this form
  })(NewClaimForm);
  