import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const ConfirmationModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Request
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>To</span>
        <p>{props.contract}</p>
        <span>Amount</span>
        <p>{props.amount}</p>
        <span>Data</span>
        <Form.Control type="text" placeholder={props.data} readOnly />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal