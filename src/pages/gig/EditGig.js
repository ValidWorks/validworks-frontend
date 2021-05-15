import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { editGig, selectGigById } from '../../utils/GigUtils'
import { getGigCategories } from '../../utils/MarketPlaceUtils'

const EditGig = ({ match }) => {
  const { gigId } = match.params

  const gig = selectGigById(gigId)

  const [title, setTitle] = useState(gig.getTitle())
  const [price, setPrice] = useState(gig.getPrice())
  const [category, setCategory] = useState(gig.getCategory())
  const [desc, setDesc] = useState(gig.getDesc())

  // const dispatch = useDispatch()
  const history = useHistory()
  // We need the wallet address 

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onPriceChanged = (e) => setPrice(e.target.value)
  const onCategoryChanged = (e) => setCategory(e.target.value)
  const onDescChanged = (e) => setDesc(e.target.value)

  const onEditGig = () => {
    if (title && price && category) {
      try {
        editGig(gigId, title, price, category, desc)
        history.push(`/gig/view/${gigId}`)
      } catch (err) {
        console.error('Failed to edit Gig: ', err)
      }
    }
  }

  const categories = getGigCategories()

  return (
    <div>
      <Form onSubmit={onEditGig}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="My New Gig" value={title} onChange={onTitleChanged}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="10" value={price} onChange={onPriceChanged}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" value={category} onChange={onCategoryChanged}>
            {categories.map(cat => {
              <option>{cat}</option>
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={desc} onChange={onDescChanged}/>
        </Form.Group>
        <Button variant="primary" type="submit">List Gig</Button>
      </Form>
    </div>
  )
}

export default EditGig