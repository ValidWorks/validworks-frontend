import React from 'react'

import { getGigCategories } from '../../utils/MarketPlaceUtils'

const Categories = () => {
  const categories = getGigCategories() 

  return (
    <div>
      <h2>You are in the categories page</h2>
    </div>
  )
}

export default Categories