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
    "AUTO GAS": 1,
    "AUTO REPAIRS": 2,
    "BOOKS & SUBSCRIPTIONS": 3,
    "CONFERENCE FEE": 4,
    "DELIGHT THE CUSTOMER": 5,
    "FUND FOR FUN": 6,
    "GOLF": 7,
    "HOTEL": 8,
    "MEALS & ENTERTAINMENT STAFF": 9,
    "MEALS & ENTERTAINMENT PROMO": 10,
    "MEETINGS": 11,
    "MILEAGE": 12,
    "OTHER": 13,
    "PARKING": 14,
    "PERSONAL/PROFESSIONAL DUES, MEMBERSHIP": 15,
    "PRIZES": 16,
    "TELEPHONE": 17,
    "TRAVEL": 18
  }

  let receipt = claim_item.image_url === null ? "No Receipt" : <img className="receipt-img" src={'/uploads/' + image_url}/> 
  let defaultValue = valueMap[expense_category.toUpperCase()];
  if (claim_status === 'P') {
    return (
      <tr>
        <td><RIEInput value={description} change={handleEditItem.bind(this, "description")} propName='description' /> <i className="ion-edit"></i> </td>
        <td>$<RIEInput value={amount.toFixed(2)} change={handleEditItem.bind(this, "amount")} propName='amount' />  <i className="ion-edit"></i></td>
        <td>      
          <select defaultValue={defaultValue} onChange={handleChangeExpenseCategory}>
            <option />
            <option value={1}>AUTO GAS</option>
            <option value={2}>AUTO REPAIRS</option>
            <option value={3}>BOOKS & SUBSCRIPTIONS</option>
            <option value={4}>CONFERENCE FEE</option>
            <option value={5}>DELIGHT THE CUSTOMER</option>
            <option value={6}>FUND FOR FUN</option>
            <option value={7}>GOLF</option>
            <option value={8}>HOTEL</option>
            <option value={9}>MEALS & ENTERTAINMENT STAFF</option>
            <option value={10}>MEALS & ENTERTAINMENT PROMO</option>
            <option value={11}>MEETINGS</option>
            <option value={12}>MILEAGE</option>
            <option value={13}>OTHER</option>
            <option value={14}>PARKING</option>
            <option value={15}>PERSONAL/PROFESSIONAL DUES, MEMBERSHIP</option>
            <option value={16}>PRIZES</option>
            <option value={17}>TELEPHONE</option>
            <option value={18}>TRAVEL</option>
          </select>
        </td>
        <td>{receipt} <input name="myFile" type="file"/></td>
        <td><RIEInput value={comment} change={handleEditItem.bind(this, "comment")} propName='comment' /> <label htmlFor="comment"><i className="ion-edit"></i></label> </td>
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
        <td></td>
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