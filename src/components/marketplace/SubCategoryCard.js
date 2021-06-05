import React from 'react'
import { Card } from 'react-bootstrap'

const SubCategoryCard = ({sub}) => {
  // const id = sub.getId()
  const title = sub.getTitle()
  const cat = sub.getCategory()

  return (
    <Card href={`/categories/${cat}/${title}`}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <a href={`/categories/${cat}/${title}`} className="stretched-link"> </a>
    </Card>
  )
}

export default SubCategoryCard;