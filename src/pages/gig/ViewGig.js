import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// import TimeAgo from '../../components/gig/TimeAgo'
import { selectGigById } from '../../utils/GigUtils'

const ViewGig = (props) => {
  const { gigId } = props.match.params

  const [gig, setGig] = useState()

  useEffect(() => {
    try {
      selectGigById(gigId)
        .then(gig => {
          console.log("Gig successfully retrieved")
          setGig(gig)
        })
    } catch (err) {
      console.log("Error retrieving gig", err)
    }
  }, [gigId])
  
  // TODO: make this into a custom error page
  if (!gig) {
    return (<h2>Gig not found!</h2>)
  }
  
  return (
    <div>
      <h2>{gig.getTitle()}</h2>
      <div>
        <span>{gig.getSellerId()}</span>
        {/* <TimeAgo timestamp={gig.date}/> */}
      </div>
      <p>{gig.getDesc()}</p>
      
      {/* TODO: only allow the owner of the gig to edit */}
      <Link to={`/gig/edit/${gig.getId()}`} className="button">
        Edit Gig
      </Link>
    </div>
  )
  
}

export default ViewGig