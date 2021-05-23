import React, { useEffect, useState } from 'react'
import { Breadcrumb, CardDeck, Nav } from 'react-bootstrap'
import SubCategoryCard from '../../components/marketplace/SubCategoryCard'

import { getGigSubCategories } from '../../utils/MarketPlaceUtils'

const SubCategories = (props) => {
  const { cat } = props.match.params

  const [subs, setSubs] = useState()

  useEffect(() => {
    try {
      getGigSubCategories(cat) 
        .then(s => {
          console.log("SubCategories retrieved", s)
          setSubs(s)
        })
    } catch (err) {
      console.error("Error retrieving subcategories", err)
    }
  }, [cat])

  let cards = ""
  if (subs && subs.length > 0) {
    cards = (
      <CardDeck>
        {subs.map((sub, index) => (
          <SubCategoryCard key={index} sub={sub} />
        ))}
      </CardDeck>
    )
  } 

  return (
    <div>
      <Nav aria-label="breadcrumb" className="main-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href='/categories'>Categories</Breadcrumb.Item>
          <Breadcrumb.Item href={`/categories/${cat}`}>{cat}</Breadcrumb.Item>
        </Breadcrumb>
      </Nav>
      {cards}
    </div>
  )
}

export default SubCategories