import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { ProxyProvider, HWProvider } from "@elrondnetwork/erdjs"

import { getErdAddrByUser } from '../../utils/UserUtils'

const proxyProvider = new ProxyProvider("https://testnet-gateway.elrond.com");
const hwWalletP = new HWProvider(proxyProvider);

const WalletAddr = ({user}) => {
  const erdAddr = getErdAddrByUser(user)

  const onAddAddr = async (event) => {
    try {
      hwWalletP.init()
        .then(success => {
          if (!success) {
            console.warn("could not initialise ledger app, make sure Elrond app is open");
            return;
          }

          hwWalletP.login()
            .then(addr => {
              console.log(addr)
              user.set("erdAddress", addr)
            })
            .catch(err => {
              console.error("Error linking elrond wallet: ", err)
              alert("Error linking elrond wallet.", err)
            })
        })
      
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

      user.set("erdAddress", "")
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
        {erdAddr}
        <Button className="ml-auto" variant="danger" onClick={onUnlinkAddr} data-addr={erdAddr}>X</Button>
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