import React, { Component } from "react";
import firebase from "./FirebaseConfig";
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class CancelBooking extends Component {

  deleteEvent(){
    const db=firebase.firestore()
    console.log(this.props.cancelId)
    var id=this.props.cancelId
    db.collection("booking").doc(id).delete().then(
      this.props.callbackFromparent(false)
    )
    
}
  render() {
    return (
      <>
      <Modal
        isOpen={this.props.openModal}
        onRequestClose={this.props.closeModal}
        style={customStyles} 
        contentLabel="Boking form">
        <div className="delete-form-container">
              <p>Är du säker att du vill avboka den tiden?</p>
              <button onClick={this.deleteEvent.bind(this)}>Ja</button>
              <button onClick={this.props.closeModal}>Gå tillbaka</button>
        </div>
      </Modal>
      </>
    );
  }
}

export default CancelBooking;
