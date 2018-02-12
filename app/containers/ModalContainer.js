import React from 'react'
import { modal } from 'react-redux-modal' // The modal emitter

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log('## MODAL DATA AND PROPS:', this.props);
  }
  
  removeThisModal() {
    this.props.removeModal();
  }
  
  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.props.bodyHtml}}/>
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