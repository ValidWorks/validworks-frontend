import React, { useState, useEffect } from 'react'
import { Alert, Button, CloseButton, Form, Row, Col, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import moralis from 'moralis'

import { createNewGig } from '../../utils/GigUtils'
import { getAllGigSubCategories } from '../../utils/MarketPlaceUtils'

const CreateGig = () => {
  const currentUser = moralis.User.current()
  const sellerId = currentUser.id

  const [thumbnail, setThumbnail] = useState(null)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [category, setCategory] = useState('')
  const [desc, setDesc] = useState('')
  const [addGigStatus, setAddGigStatus] = useState('idle')
  const [subs, setSubs] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()

  useEffect(() => {
    try {
      getAllGigSubCategories()
        .then(s => {
          console.log("Sub categories retrieved", s)
          setSubs(s)
        })
    } catch (err) {
      console.log("Error retrieving gig", err)
    }
  }, [])

  const onCreateNewGig = (event) => {
    event.preventDefault()

    if (addGigStatus === 'idle') {
      try {
        setIsLoading(true)
        setAddGigStatus('pending')
        
        const moralisThumbnail = new moralis.File(thumbnail.name, thumbnail)
        createNewGig(moralisThumbnail, title, price, deliveryTime, category, desc, sellerId)
          .then((gig) => {
            console.log("New Gig created with the gigId: ", gig.id)
            history.push(`/gig/view/${gig.id}`)
          })
      } catch (err) {
        console.error('Failed to create new Gig: ', err)
      } finally {
        setIsLoading(false)
        setAddGigStatus('idle')
      }
    }
  }

  return (
    <div>
      {addGigStatus === 'pending' && (
        <Alert status="error">
          <Alert.Heading>Create gig status: pending</Alert.Heading>
          <p display="block">Please try again later</p>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}

      <Form onSubmit={onCreateNewGig}>
        <Form.Group>
          <Form.File label="Upload Thumbnail" onChange={(event) => setThumbnail(event.target.files[0])}/>
        </Form.Group>
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
              <option key={index}>{sub.getTitle()}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)}/>
        </Form.Group>
        <Button variant='success' type='submit' disabled={isLoading}>
          List Gig&nbsp;
          {isLoading && <Spinner animation="border" role="status" size="sm" />}
        </Button>
      </Form>
    </div>
  )
}

export default CreateGig