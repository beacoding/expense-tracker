import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'

const ClaimItem = ({ employee, claim_item, claim_status, handleDeleteItem, handleEditItem, expense_categories, handleChangeExpenseCategory }) => {
  const {
    claim_item_id,
    description, 
    amount,
    comment, 
    expense_category,
    image_url,
  } = claim_item;

  const valueMap = {
    "Auto Gas": 1,
    "Auto Repairs": 2,
    "Books & Subscriptions": 3,
    "Conference Fee": 4,
    "Delight the Customer": 5,
    "Fund for Fun": 6,
    "Golf": 7,
    "Hotel": 8,
    "Meals & Entertainment Staff": 9,
    "Meals & Entertainment Promo": 10,
    "Meetings": 11,
    "Mileage": 12,
    "Other": 13,
    "Parking": 14,
    "Personal/Professional Dues, Membership": 15,
    "Prizes": 16,
    "Telephone": 17,
    "Travel": 18
  }

  console.log(handleEditItem);

  let receipt = claim_item.image_url === null ? "No Receipt" : <img className="receipt-img" src={'/uploads/' + image_url}/> 
  let defaultValue = valueMap[expense_category.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())];
  console.log(expense_category.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()))
  console.log(defaultValue)
  if (claim_status === 'P') {
    return (
      <tr>
        <td><RIEInput value={description} change={handleEditItem.bind(this, "description")} propName='new_description' /> <i className="ion-edit"></i> </td>
        <td>$<RIEInput value={amount.toFixed(2)} change={handleEditItem.bind(this, "amount")} propName='new_amount' />  <i className="ion-edit"></i></td>
        <td>      
        <select defaultValue={defaultValue} onChange={handleChangeExpenseCategory}>
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
      </td>
        <td><RIEInput value={comment} change={handleEditItem.bind(this, "comment")} propName='new_comment' /> <i className="ion-edit"></i> </td>
        <td>{receipt} <input name="myFile" type="file"/></td>
        <td><i className="ion-close-circled pointer" onClick={handleDeleteItem}></i></td>
      </tr>
    )
  } else {
    return (
    <tr>
      <td>{description}</td>
      <td>${amount.toFixed(2)}</td>
      <td>{expense_category}</td>
      <td>{receipt}</td>
      <td>{comment}</td>
      <td><i className="ion-close-circled pointer" onClick={handleDeleteItem}></i></td>
    </tr>
      )
  }
}

ClaimItem.propTypes = {
  claim_item: PropTypes.shape({
    claim_item_id: PropTypes.number.isRequired,
    description: PropTypes.string,
    amount: PropTypes.number.isRequired,
    comment: PropTypes.string,
    expense_category: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired
}

export default ClaimItem;