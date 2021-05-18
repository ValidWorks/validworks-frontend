import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import moralis from 'moralis'

import { getErdAddrByUser } from '../../utils/UserUtils'

const WalletAddr = ({user}) => {
  const erdAddr = getErdAddrByUser(user)

  const onAddAddr = async (event) => {
    try {
      console.log(moralis.ERD)
      moralis.ERD.link()
    } catch (error) {
      console.error("Error linking elrond wallet: ", error)
      alert("Error linking elrond wallet.")
    }
  }

  const onUnlinkAddr = async (event) => {
    event.preventDefault()
    try {
      const address = event.target.dataset.addr
      console.log("onUnlinkAddr:", address)

      const confirmed = window.confirm("Are you sure you want to remove this address?")
      if (!confirmed) {
        return
      }

      await moralis.ERD.unlink(address)
      alert("Address removed from profile!")
    } catch (error) {
      console.error("Error unlinking address:", error)
      alert("Error unlinking address.")
    }
  }

  let addr = ""
  console.log("User", user)
  if (erdAddr) {
    addr = (
      <ListGroupItem>
        <Button variant="danger" onClick={onUnlinkAddr} data-addr={erdAddr}>X</Button>
        {erdAddr}
      </ListGroupItem>
    )
  } else {
    addr = (
      <ListGroupItem>
        <Button variant="primary" onClick={onAddAddr}>Link Wallet</Button>
      </ListGroupItem>
    )
  }

  return (
    <div>
      <p>Linked Addresses</p>
      <ListGroup>
        {addr}
      </ListGroup>
    </div>
  )
}

export default WalletAddr