import React, { useEffect, useState } from 'react'

import { selectGigsBySellerId } from '../../utils/GigUtils'

const MyGigs = () => {
  const [gigs, setGigs] = useState()

  const sellerId = 0

  useEffect(() => {
    try {
      selectGigsBySellerId(sellerId)
        .then(gig => setGigs(gig))
    } catch (err) {
      console.log("Error retrieving gig", err)
    }
  }, [])
  
  return (
    <h2>
      You are at the My gigs page
    </h2>
  )
  
}

export default MyGigs