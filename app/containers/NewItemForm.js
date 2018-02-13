import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class NewItemForm extends React.Component {
  constructor(props) {
      super(props);
  }


//form for submit new claim initial items
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description</label>
          <div>
            <Field
              name="description"
              component="input"
              type="text"
              placeholder="Travelling to Tatooine"
            />
          </div>
        </div>
        <div>
          <label htmlFor="Amount">Amount</label>
          <div>
            <Field
              name="amount"
              id="amount"
              component="input"
              type="number"
            />
          </div>
        </div>
        <div>
          <label>Receipt</label>
          <div>
            <Field
              name="hasreceipt"
              component="input"
              type="checkbox"
              default={0}
            />
          </div>
        </div>
        <div>
          <label>Expense Type</label>
          <div>
          <Field name="expensetype" component="select">
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
          <label>Comment</label>
          <div>
            <Field name="comment" component="textarea" />
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
    form: 'NewItemForm', // a unique identifier for this form
  })(NewItemForm);
  