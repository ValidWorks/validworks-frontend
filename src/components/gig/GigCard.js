import React from 'react'
import { Card } from 'react-bootstrap'

const GigCard = ({gig}) => {
  const id = gig.getId()
  const title = gig.getTitle()
  const price = gig.getPrice()
  const category = gig.getCategory()
  const thumbnailUrl = gig.getThumbnail().url()

  // eslint-disable-next-line
  return (
    <Card className="mb-4 box-shadow" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={thumbnailUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Price: {price}</Card.Subtitle>
        <Card.Text>{category}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Posted 1 day ago</small>
      </Card.Footer>
      <a href={`/gig/view/${id}`} className="stretched-link"> </a>
    </Card>
  )
}

export default GigCard;