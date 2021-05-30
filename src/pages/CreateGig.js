import React, { useState } from "react";
import { Alert, Button, CloseButton, Form, Row, Col, Spinner } from "react-bootstrap";
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
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory();
  const { Moralis, user } = useMoralis();
  const sellerId = user.id;

  console.log(getRandomNumber());

  const onCreateNewGig = (event) => {
    event.preventDefault();

    setIsLoading(true)

    // Generate gig_id: u64

    // Convert delivery time (in days) to nonce
    let deliveryNonce = deliveryTime * 14400;
    // TODO: Change sc to use String; generate alphanumeric hash
    let onChainId = getRandomNumber();
    let sellerAddr = user.get("erdAddress");

    if (addGigStatus === "idle") {
      sellerList(sellerAddr, onChainId, deliveryNonce, price)
        .then((reply) => {
          console.log(reply.getHash().toString());
          if (reply.getStatus().isSuccessful()) {
            try {
              setAddGigStatus("pending");
              const moralisThumbnail = new Moralis.File(
                thumbnail.name,
                thumbnail
              );
              createNewGig(
                moralisThumbnail,
                title,
                price,
                desc,
                sellerId,
                onChainId,
                reply.getHash().toString(),
                sellerAddr
              ).then((gig) => {
                console.log("New Gig created with the gigId: ", gig.id);
                history.push(`/`);
              });
            } catch (err) {
              console.error("Failed to create new Gig: ", err);
            } finally {
              setAddGigStatus("idle");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsLoading(false)
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
          {isLoading && <Spinner animation="border" role="status" />}
        </Button>
      </Form>
    </div>
  );
};

const getRandomNumber = () => {
  return Math.random() * 2e19;
};

export default CreateGig;
