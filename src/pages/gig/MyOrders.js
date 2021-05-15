import React, { useEffect, useState } from 'react'

import { selectGigsByBuyerId } from '../../utils/GigUtils'

const MyOrders = () => {
  const [gigs, setGigs] = useState()

  const buyerId = 0

  useEffect(() => {
    try {
      selectGigsByBuyerId(buyerId)
        .then(gig => setGigs(gig))
    } catch (err) {
      console.log("Error retrieving gig", err)
    }
  }, [])
  
  return (
    <h2>
      You are at the My Orders page
    </h2>
  )
}

export default MyOrders