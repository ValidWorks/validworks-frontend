import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'

import { createNewGig } from '../../utils/GigUtils'

const CreateGig = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [desc, setDesc] = useState('')
  const [addGigStatus, setAddGigStatus] = useState('idle')

  const [gigId, setGigId] = useState()
  const [redirect, setRedirect] = useState(false)

  // const dispatch = useDispatch()
  const history = useHistory()
  // We need the wallet address 

  const sellerId = 0;

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onPriceChanged = (e) => setPrice(e.target.value)
  const onCategoryChanged = (e) => setCategory(e.target.value)
  const onDescChanged = (e) => setDesc(e.target.value)

  const canCreate = [title, price, desc].every(Boolean) && addGigStatus === 'idle'

  const onCreateNewGig = () => {
    console.log(canCreate)
    if (canCreate) {
      try {
        setAddGigStatus('pending')
        createNewGig(title, price, category, desc, sellerId)
          .then((gigId) => {
            console.log("hello", gigId)
            setGigId(gigId)
            setRedirect(true)
            // history.push(`/gig/view/${gigId}`)
          })
      } catch (err) {
        console.error('Failed to create new Gig: ', err)
      } finally {
        setAddGigStatus('idle')
      }
    }
  }

  if (redirect) {
    return <Redirect to={`/gig/view/${gigId}`}/>
  }

  return (
    <div>
      <Form onSubmit={onCreateNewGig}>
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
            <option>Web development</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={desc} onChange={onDescChanged}/>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!canCreate}>List Gig</Button>
      </Form>
    </div>
  )
}

export default CreateGig