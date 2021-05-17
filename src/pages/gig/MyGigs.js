import React, { useEffect, useState } from 'react'
import { CardColumns } from 'react-bootstrap'
import moralis from 'moralis'

import { selectGigsBySellerId } from '../../utils/GigUtils'
import GigCard from '../../components/gig/GigCard'

const MyGigs = () => {
  const currentUser = moralis.User.current()
  const sellerId = currentUser.id

  const [gigs, setGigs] = useState()

  useEffect(() => {
    try {
      selectGigsBySellerId(sellerId)
        .then(g => {
          console.log("Gigs retrieved:", g)
          setGigs(g)
        })
    } catch (err) {
      console.log("Error retrieving gig", err)
    }
  }, [])

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
        You are at the My gigs page
      </h2>
      {cards}
    </div>
    
  )
  
}

export default MyGigs