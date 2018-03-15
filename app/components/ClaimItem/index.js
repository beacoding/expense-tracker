import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'

const ClaimItem = ({ employee, claim_item, claim_status, handleDeleteItem, handleEditItem, expense_types, handleChangeExpenseCategory }) => {
  const {
    claim_item_id,
    description, 
    amount,
    comment, 
    expense_category,
    image_url,
  } = claim_item;

  const valueMap = {}

  expense_types.map((expense_type) => {
    let expense_type_id = expense_type.id;
    let expense_type_category = expense_type.category;
    valueMap[expense_type_category] = expense_type_id;
  });

  let receipt = claim_item.image_url === null ? "No Receipt" : <img className="receipt-img" src={'/uploads/' + image_url}/> 
  let defaultValue = valueMap[expense_category.toUpperCase()];
  if (claim_status === 'P') {
    return (
      <tr>
        <td><RIEInput value={description} change={handleEditItem.bind(this, "description")} propName='description' /> <i className="ion-edit"></i> </td>
        <td>$<RIEInput value={amount.toFixed(2)} change={handleEditItem.bind(this, "amount")} propName='amount' />  <i className="ion-edit"></i></td>
        <td>      
          <select value={defaultValue} onChange={handleChangeExpenseCategory}>
            <option value="" disabled> Select an expense category. </option>
            {
              expense_types.map((expense_type) => {
                let expense_type_id = expense_type.id;
                let expense_type_category = expense_type.category;
                return <option value={expense_type_id} key={expense_type_id}>{expense_type_category}</option>
              })
            }
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