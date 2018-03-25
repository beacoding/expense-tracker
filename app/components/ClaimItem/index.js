import React from 'react';
import PropTypes from 'prop-types';
import { RIEInput, RIETextArea, RIENumber } from 'riek';
import ImageZoom from 'react-medium-image-zoom';
import { claimItemsHelpers } from '../../helpers';
import FileBase64 from 'react-file-base64';

const ClaimItem = ({ employee, claim_item, claim_status, handleDeleteItem, handleEditItem, isNumberAcceptable, validateMealExpense, expense_types, handleChangeExpenseCategory, handleEditReceipt, policies, handleChangeDistance, handleEditMileage }) => {
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

  let consts = {zoomStyle: 'opacity: 0.1;background-color: black;'}
  //
  let receipt = (claim_item.image_url) === "null" ? "No Receipt" :

  <ImageZoom
    image={{
      src: claim_item.image_url,
      alt: claim_item.description + ' Receipt',
      className: 'img',
      style: { width: '50px'}
    }}
    zoomImage={{
      alt: claim_item.description + 's Receipt',
      src: claim_item.image_url,
      alt: claim_item.description + ' Receipt',
    }}
    defaultStyles={{
      overlay: {
        backgroundColor: 'rgba(0,0,0,0.7)'
      }
    }}
    {...consts}
  />;

  let defaultValue = valueMap[expense_category.toUpperCase()];
  if (expense_category === "MILEAGE" && claim_status === "P") {
    let distance = claimItemsHelpers.amountToDistance(amount, policies["Per Mileage Reimbursement"]);
    return (
      <tr>
        <td><RIEInput value={description || "Enter Description Here"} change={handleEditItem.bind(this, "description", claim_item)} propName='description' /> <i className="ion-edit"></i> </td>
        <td><div id={"distance-amount-" + claim_item_id}>${amount.toFixed(2)}</div> <br></br> <RIENumber value={distance.toFixed(2) || "Enter Distance Here"} validate={isNumberAcceptable.bind(this)} change={handleEditMileage.bind(this, "mileage", claim_item)} propName='mileage' /> KM <i className="ion-edit"></i></td>
        <td>
          <select className="claim-item-expense-type-select" value={defaultValue} onChange={handleChangeExpenseCategory.bind(this, claim_item)}>
            <option value="" disabled> Select an expense category. </option>
            {
              expense_types.map((expense_type) => {
                let expense_type_id = expense_type.id;
                let expense_type_category = expense_type.category
                return <option value={expense_type_id} key={expense_type_id}>{expense_type_category}</option>
              })
            }
          </select>
        </td>
        <td> {receipt} <span><label className="fileContainer"> <i className="ion-upload" style={{fontSize: 18 + 'pt', verticalAlign: 'middle'}}></i> <input name="myFile" type="file" onChange={handleEditReceipt.bind(this, claim_item)}/></label></span></td>
        <td><RIETextArea value={comment || "Enter Comment Here"} change={handleEditItem.bind(this, "comment", claim_item)} propName='comment' /> <label htmlFor="comment"><i className="ion-edit"></i></label> </td>
        <td><i className="ion-close-circled pointer" style={{fontSize: 18 + 'px'}} onClick={handleDeleteItem}></i></td>
      </tr>
      )
  } else if (claim_status === 'P') {
    return (
      <tr>
        <td><RIEInput value={description || "Enter Description Here"} change={handleEditItem.bind(this, "description", claim_item)} propName='description' /> <i className="ion-edit"></i> </td>
        <td>$<RIENumber value={amount.toFixed(2) || "Enter Amount Here"} validate={isNumberAcceptable.bind(this), validateMealExpense.bind(this, policies["Maximum Per Meal Expense"])} change={handleEditItem.bind(this, "amount", claim_item)} propName='amount' />  <i className="ion-edit"></i></td>
        <td>
          <select className="claim-item-expense-type-select" value={defaultValue} onChange={handleChangeExpenseCategory.bind(this, claim_item)}>
            <option value="" disabled> Select an expense category. </option>
            {
              expense_types.map((expense_type) => {
                let expense_type_id = expense_type.id;
                let expense_type_category = expense_type.category
                return <option value={expense_type_id} key={expense_type_id}>{expense_type_category}</option>
              })
            }
          </select>
        </td>
        <td> {receipt} <span><label className="fileContainer"> <i className="ion-upload" style={{fontSize: 18 + 'pt', verticalAlign: 'middle'}}></i> <input name="myFile" type="file" onChange={handleEditReceipt.bind(this, claim_item)}/></label></span></td>
        <td><RIETextArea value={comment || "Enter Comment Here"} change={handleEditItem.bind(this, "comment", claim_item)} propName='comment' /> <label htmlFor="comment"><i className="ion-edit"></i></label> </td>
        <td><i className="ion-close-circled pointer" style={{fontSize: 18 + 'px'}} onClick={handleDeleteItem}></i></td>
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