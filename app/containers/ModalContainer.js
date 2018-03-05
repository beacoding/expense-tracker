import React from 'react'
import { modal } from 'react-redux-modal' // The modal emitter
import Dropdown from 'react-dropdown' // To support using dropdowns in the modal

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  removeThisModal() {
    this.props.removeModal();
  }
  
  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.props.bodyHtml}}/>
        { this.props.hasDropdown && <Dropdown className="" options={this.props.dropdownOptions} onChange={this.props.onDropdownChangeFunction} value={this.props.dropdownDefaultValue} placeholder={this.props.dropdownPlaceholder} /> }
        { this.props.hasTextArea && <div className="form-group"><textarea className="form-control" rows="4" cols="50" onChange={this.props.onTextAreaChangeFunction} value={this.props.textAreaValue} placeholder={this.props.textAreaPlaceholder} required={this.props.textAreaRequired} /></div> }        
        <div className="modal-buttons-container">
          { !this.props.hideCloseButton && <button className="page-button-blue" onClick={this.props.dismissAction || this.removeThisModal.bind(this)}>{this.props.dismissText || 'Cancel'}</button> }
          { this.props.negativeText && <button className="page-button-red" onClick={this.props.negativeAction || this.removeThisModal.bind(this)}>{this.props.negativeText}</button> }
          { this.props.affirmativeText && <button className="page-button-green" onClick={this.props.affirmativeAction || this.removeThisModal.bind(this)}>{this.props.affirmativeText}</button> }
        </div>
      </div>
    );
  }
}

export default ModalContainer;