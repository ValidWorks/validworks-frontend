import React from 'react'

import GigCard from '../../components/gig/GigCard'

const ListingPreview = ({ title, items }) => {
  return (
    <div>
      <h2>{ title.toUpperCase() }</h2>
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (<GigCard item={item}/>))
       }
    </div>
  )
}

export default ListingPreview