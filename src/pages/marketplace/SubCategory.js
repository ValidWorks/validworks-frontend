import React from 'react'

import { getGigSubCategories } from '../../utils/MarketPlaceUtils'

const SubCategories = (props) => {
  const { cat } = props.match.params

  const sub = getGigSubCategories(cat) 

  return (
    <div>
      <h2>You are in the subcategories page</h2>
    </div>
  )
}

export default SubCategories