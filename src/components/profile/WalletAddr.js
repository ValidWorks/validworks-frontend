import moralis from 'moralis'
import React from 'react'
import { Button } from 'react-bootstrap'

const WalletAddr = (user) => {

  const onAddAddr = async (event) => {
    try {
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
  if (user.attributes.erdAddress) {
    const erdAddress = user.attributes.erdAddress
    addr = (
      <li>
        <Button variant="danger" onClick={onUnlinkAddr} data-addr={erdAddress}>X</Button>
        {erdAddress}
      </li>
    )
  } else {
    addr = (
      <li>
        <Button variant="primary" onClick={onAddAddr}>Link</Button>
      </li>
    )
  }

  return (
    <div>
      <h3>Linked Addresses</h3>
      <ul>
        {addr}
      </ul>
    </div>
  )
}

export default WalletAddr