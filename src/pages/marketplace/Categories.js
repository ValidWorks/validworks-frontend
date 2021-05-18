import React, { useEffect, useState } from 'react'
import { CardDeck } from 'react-bootstrap'

import CategoryCard from '../../components/marketplace/CategoryCard'
import { getGigCategories } from '../../utils/MarketPlaceUtils'

const Categories = () => {
  const [categories, setCategories] = useState()

  useEffect(() => {
    try {
      getGigCategories() 
        .then(cats => {
          console.log("Categories retrieved", cats)
          setCategories(cats)
        })
    } catch (err) {
      console.error("Error retrieving categories", err)
    }
  }, [])

  let cards = ""
  if (categories && categories.length > 0) {
    cards = (
      <CardDeck>
        {categories.map((cat, index) => (
          <CategoryCard key={index} cat={cat} />
        ))}
      </CardDeck>
    )
  } 

  return (
    <div>
      {cards}
    </div>
  )
}

export default Categories