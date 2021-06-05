import React from 'react'
import { Card } from 'react-bootstrap'

const CategoryCard = ({cat}) => {
  // const id = cat.getId()
  const title = cat.getTitle()

  return (
    <Card>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <a href={`/categories/${title}`} className="stretched-link"> </a>
    </Card>
  )
}

export default CategoryCard;