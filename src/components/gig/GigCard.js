import React from 'react'
import { Card } from 'react-bootstrap'

const GigCard = ({gig}) => {
  const id = gig.getId()
  const title = gig.getTitle()
  const price = gig.getPrice()
  const category = gig.getCategory()
  const thumbnailUrl = gig.getThumbnail().url()

  return (
    <Card className="mb-4 box-shadow">
      <Card.Img variant="top" src={thumbnailUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle class="mb-2 text-muted">Price: {price}</Card.Subtitle>
        <Card.Text>{category}</Card.Text>
        <a href={`/gig/view/${id}`} class="stretched-link"></a>
      </Card.Body>
    </Card>
  )
}

export default GigCard;