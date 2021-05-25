import React, { useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'

const LoadingGig = (props) => {
  return (
    <Modal>
      <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
    </Modal>
  )
}

export default LoadingGig