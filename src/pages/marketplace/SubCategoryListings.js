import React, { useEffect, useState } from 'react'
import { Breadcrumb, Nav } from 'react-bootstrap'
import GigListings from '../../components/marketplace/GigListings'

import { getGigListingsBySub } from '../../utils/MarketPlaceUtils'

const SubCategoriesListings = (props) => {
  const { cat, sub } = props.match.params

  const [gigs, setGigs] = useState()

  useEffect(() => {
    try {
      getGigListingsBySub(sub) 
        .then(g => {
          console.log("Listings retrieved", g)
          setGigs(g)
        })
    } catch (err) {
      console.error("Error retrieving listings", err)
    }
  }, [sub])

  return (
    <div>
      <Nav aria-label="breadcrumb" className="main-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href='/categories'>Categories</Breadcrumb.Item>
          <Breadcrumb.Item href={`/categories/${cat}`}>{cat}</Breadcrumb.Item>
          <Breadcrumb.Item href={`/categories/${cat}/${sub}`}>{sub}</Breadcrumb.Item>
        </Breadcrumb>
      </Nav>
      <br/>
      <GigListings gigs={gigs} />
    </div>
  )
}

export default SubCategoriesListings