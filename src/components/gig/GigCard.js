import React from 'react'
import { Card } from 'react-bootstrap'

const GigCard = ({item}) => {
  const { id, title, price, imageUrl } = item
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle class="mb-2 text-muted">Price: {price}</Card.Subtitle>
        <Card.Text></Card.Text>
        <a href={`/gig/view/${id}`} class="stretched-link"></a>
      </Card.Body>
    </Card>
  )
}

export default GigCard;