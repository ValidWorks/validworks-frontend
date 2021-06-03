import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const SuccessModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.txStatus}!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Your transaction was completed successfully</span>
        <p>
          <a href={
            "https://testnet-explorer.elrond.com/transactions/" +
            props.txHash
          }>
            {props.txHash}
          </a>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.onHide}>Done</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SuccessModal