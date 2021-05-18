import React, { useEffect, useState } from 'react'
import { CardColumns } from 'react-bootstrap'
import moralis from 'moralis'

import { selectGigsByBuyerId } from '../../utils/GigUtils'
import GigCard from '../../components/gig/GigCard'

const MyOrders = () => {
  const currentUser = moralis.User.current()
  const buyerId = currentUser.id

  const [gigs, setGigs] = useState()

  useEffect(() => {
    try {
      selectGigsByBuyerId(buyerId)
        .then(g => setGigs(g))
    } catch (err) {
      console.log("Error retrieving gig", err)
    }
  }, [buyerId])

  let cards = ""
  if (gigs) {
    cards = (
      <CardColumns>
        {gigs.map((gig) => (
          <GigCard gig={gig} />
        ))}
      </CardColumns>
    )
  }
  
  return (
    <div>
      <h2>
        You are at the My Orders page
      </h2>
      { cards }
    </div>
    
  )
}

export default MyOrders