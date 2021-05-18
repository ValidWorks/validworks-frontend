import React, { useEffect, useState } from 'react'
import { CardColumns } from 'react-bootstrap'
import moralis from 'moralis'

import { selectGigsBySellerId } from '../../utils/GigUtils'
import GigCard from '../../components/gig/GigCard'

const MyGigs = () => {
  const currentUser = moralis.User.current()
  const sellerId = currentUser.id

  const [gigs, setGigs] = useState([])

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
  }, [sellerId])

  let cards = ""
  if (gigs && gigs.length > 0) {
    cards = (
      <CardColumns>
        {gigs.map((gig, index) => (
          <GigCard key={index} gig={gig} />
        ))}
      </CardColumns>
    )
  } else {
    cards = (
      <h2>You have not listed any gigs yet. List one now?</h2>
    )
  }
  
  return (
    <div>
      {cards}
    </div>
    
  )
  
}

export default MyGigs