import React, { useState, useEffect } from "react";
import { Alert, Button, CloseButton, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useMoralis } from "react-moralis";

import { createNewGig } from "../utils/GigUtils";
import { sellerList } from "../utils/ErdjsUtils";

const CreateGig = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [desc, setDesc] = useState("");
  const [addGigStatus, setAddGigStatus] = useState("idle");

  const history = useHistory();
  const { Moralis, user } = useMoralis();
  const sellerId = user.id;

  const onCreateNewGig = (event) => {
    event.preventDefault();

    // Convert delivery time (in days) to nonce
    let deliveryNonce = deliveryTime * 8640;
    sellerList(user.get("erdAddress"), 1, deliveryNonce, price);

    if (addGigStatus === "idle") {
      try {
        setAddGigStatus("pending");
        const moralisThumbnail = new Moralis.File(thumbnail.name, thumbnail);
        createNewGig(moralisThumbnail, title, price, desc, sellerId).then(
          (gig) => {
            console.log("New Gig created with the gigId: ", gig.id);
            history.push(`/`);
          }
        );
      } catch (err) {
        console.error("Failed to create new Gig: ", err);
      } finally {
        setAddGigStatus("idle");
      }
    }
  };

  return (
    <div>
      {addGigStatus === "pending" && (
        <Alert status='error'>
          <Alert.Heading>Create gig status: pending</Alert.Heading>
          <p display='block'>Please try again later</p>
          <CloseButton position='absolute' right='8px' top='8px' />
        </Alert>
      )}

      <Form onSubmit={onCreateNewGig}>
        <Form.Group>
          <Form.File
            label='Upload Thumbnail'
            onChange={(event) => setThumbnail(event.target.files[0])}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='My New Gig'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            placeholder='10'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Delivery Time</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type='number'
                placeholder='10'
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Days</Form.Label>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Button variant='success' type='submit'>
          List Gig
        </Button>
      </Form>
    </div>
  );
};

export default CreateGig;
