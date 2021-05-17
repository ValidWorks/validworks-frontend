import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { editGig, selectGigById } from '../../utils/GigUtils'
import { getGigCategories } from '../../utils/MarketPlaceUtils'

const EditGig = ({ match }) => {
  const { gigId } = match.params

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [desc, setDesc] = useState('')
  const [gig, setGig] = useState()

  const history = useHistory()

  useEffect(() => {
    try {
      selectGigById(gigId)
        .then(gig => {
          console.log("Gig successfully retrieved")
          setGig(gig)
          setTitle(gig.getTitle())
          setPrice(gig.getPrice())
          setCategory(gig.getCategory())
          setDesc(gig.getDesc())
        })
    } catch (err) {
      console.log("Error retrieving gig", err)
    }
  }, [gigId])

  

  // TODO: make this into a custom error page
  if (!gig) {
    return (<h2>Gig not found!</h2>)
  }

  const onEditGig = (event) => {
    event.preventDefault()

    if (title && price && category) {
      try {
        editGig(gigId, title, price, category, desc)
          .then(() => {
            console.log("Gig successfully updated.")
            history.push(`/gig/view/${gigId}`)
          })
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
          <Form.Control type="text" placeholder="My New Gig" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="10" value={price} onChange={(e) => setPrice(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Web Development</option>
            {/* {categories.map(cat => {
              return (<option>{cat}</option>)
            })} */}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">Save Gig</Button>
      </Form>
    </div>
  )
}

export default EditGig