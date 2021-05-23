import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { editGig, selectGigById } from '../../utils/GigUtils'
import { getAllGigSubCategories } from '../../utils/MarketPlaceUtils'

const EditGig = ({ match }) => {
  const { gigId } = match.params

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [category, setCategory] = useState('')
  const [desc, setDesc] = useState('')
  const [gig, setGig] = useState()
  const [subs, setSubs] = useState([])

  const history = useHistory()

  useEffect(() => {
    try {
      selectGigById(gigId)
        .then(gig => {
          console.log("Gig successfully retrieved")
          setGig(gig)
          setTitle(gig.getTitle())
          setPrice(gig.getPrice())
          setDeliveryTime(gig.getDeliveryTime())
          setCategory(gig.getCategory())
          setDesc(gig.getDesc())
        })
      getAllGigSubCategories()
        .then(s => {
          console.log("Sub categories retrieved", s)
          setSubs(s)
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
    console.log(title, price)
    try {
      console.log("try")
      editGig(gigId, title, price, deliveryTime, category, desc)
        .then(() => {
          console.log("Gig successfully updated.")
          history.push(`/gig/view/${gigId}`)
        })
    } catch (err) {
      console.error('Failed to edit Gig: ', err)
    }
  }

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
          <Form.Label>Delivery Time</Form.Label>
          <Row>
            <Col>
              <Form.Control type="number" placeholder="10" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)}/>
            </Col>
            <Col>
              <Form.Label>Days</Form.Label>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            {subs.map((sub, index) => (
              <option key={index} value={sub.getCategory()}>{sub.getTitle()}</option>
            ))}
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