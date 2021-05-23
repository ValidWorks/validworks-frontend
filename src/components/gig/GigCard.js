import React from "react";
import { Card } from "react-bootstrap";
import ViewGig from "../../pages/gig/ViewGig";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router";

const GigCard = ({ gig }) => {
  const history = useHistory();

  const id = gig.getId();
  const title = gig.getTitle();
  const price = gig.getPrice();
  const thumbnailUrl = gig.getThumbnail().url();

  return (
    <div
      style={{ textAlign: "center" }}
      onClick={() => {
        history.push(`/gig/view/${id}`);
      }}
    >
      <img
        src={thumbnailUrl}
        alt=''
        style={{
          width: "100%",
          height: "170px",
          objectFit: "contain",
          marginBottom: "10px",
        }}
      />
      <p style={{ fontSize: "14px", padding: "5px 0", marginBottom: "3px" }}>
        {title}
      </p>
      <hr
        style={{
          color: "#28A745",
          backgroundColor: "#28A745",
          height: 1,
          width: "80%",
          marginTop: "0px",
          marginBottom: "0px",
        }}
      />
      <p
        style={{
          fontSize: "16px",
          padding: "5px 0",
          color: "#28A745",
          marginTop: "2px",
        }}
      >
        {price} EGLD
      </p>
    </div>
  );
};

export default GigCard;
/*    <div class='card'>
      <img src={thumbnailUrl} alt='Avatar' style='width:100%' />
      <div class='container'>
        <h4>
          <b>{title}</b>
        </h4>
        <p>{price}</p>
      </div>
    </div>
    <Card border='light' style={{ width: "18rem" }}>
      <Card.Img variant='top' src={thumbnailUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          Price: {price}
        </Card.Subtitle>
      </Card.Body>
      <a href={`/gig/view/${id}`} className='stretched-link'></a>
    </Card>
*/
