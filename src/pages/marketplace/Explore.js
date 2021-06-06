import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import moralis from 'moralis'

import GigListings from '../../components/marketplace/GigListings'
import { getGigCategories, getGigListings } from '../../utils/MarketPlaceUtils'
import CategoryCarousel from '../../components/marketplace/CategoryCarousel'

const Explore = ()  => {
  const [gigs, setGigs] = useState([])
  const [categories, setCategories] = useState()

  useEffect(() => {
      getGigCategories() 
        .then(cats => {
          console.log("Categories retrieved", cats)
          setCategories(cats)
        })
        .catch(err => {
          console.error("Error retrieving categories", err)
        })
      getGigListings() 
        .then(g => {
          console.log("Gigs retrieved", g)
          setGigs(g)
        })
        .catch(err => {
          console.error("Error retrieving latest gigs:", err)
        })
  }, [])

  const currentUser = moralis.User.current()

  if (!currentUser) {
    return <Redirect to='/auth'/>
  }

  return (
    <div>
      <h2>Categories</h2>
      <CategoryCarousel cats={categories} />

      <br/>
      <h2>Latest Gigs</h2>
      <hr/>
      <GigListings gigs={gigs} />
    </div>
  )
}

export default Explore;