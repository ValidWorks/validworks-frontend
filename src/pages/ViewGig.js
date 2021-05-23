import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useMoralis } from "react-moralis";
// import TimeAgo from '../../components/gig/TimeAgo'
import { selectGigById } from "../utils/GigUtils";
import { getEmail } from "../utils/UserUtils";

const ViewGig = (props) => {
  const { isAuthenticated, user } = useMoralis();
  const [gig, setGig] = useState();
  const { gigId } = props.match.params;
  useEffect(() => {
    try {
      selectGigById(gigId).then((gig) => {
        console.log("Gig successfully retrieved");
        setGig(gig);
      });
    } catch (err) {
      console.log("Error retrieving gig", err);
    }
  }, [gigId]);

  if (!gig) {
    return <div></div>;
  }

  // Get seller contact
  let sellerId = gig.getSellerId();
  let sellerEmail = getEmail(sellerId);

  // DEFAULT
  // unauthenticated visitor & Open
  // unauthenticated visitor & InOrder
  // authenticated visitor & InOrder
  let items = <Row></Row>;
  // authenticated visitor & Open
  // Order
  let visitorItems = (
    <Row style={{ marginTop: "60px" }}>
      <Button
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Order
      </Button>
    </Row>
  );
  // seller & InOrder
  // Deliver Claim
  let sellerOrderItems = (
    <Row style={{ marginTop: "60px" }}>
      <Button
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Deliver
      </Button>

      <Button
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Claim
      </Button>

      <Button
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Unlist
      </Button>
    </Row>
  );
  // seller & Open
  // Unlist
  let sellerOpenItems = (
    <Row style={{ marginTop: "60px" }}>
      <Button
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Unlist
      </Button>
    </Row>
  );
  // buyer
  // Dispute Refund Accept
  let buyerItems = (
    <Row style={{ marginTop: "60px" }}>
      <Button
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Refund
      </Button>

      <Button
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Dispute
      </Button>

      <Button
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Accept
      </Button>
    </Row>
  );

  // CASE: unauthenticated visitor
  if (!isAuthenticated) {
    return (
      <Container
        style={{ width: "65%", marginTop: "50px", marginBottom: "50px" }}
      >
        <Row>
          <Col>
            <img
              style={{ height: "300px", width: "300px" }}
              src={gig.getThumbnail().url()}
            />
          </Col>
          <Col style={{ marginLeft: "10px", width: "100%" }} xs={6}>
            <Row>
              <h1>{gig.getTitle()}</h1>
            </Row>
            <Row>
              <Button
                size='sm'
                variant='success'
                style={{ marginTop: "10px", marginLeft: "0px" }}
              >
                {gig.getStatus()}
              </Button>
            </Row>

            <Row style={{ marginTop: "10px" }}>{gig.getPrice()} EGLD</Row>
            <Row style={{ marginTop: "10px" }}>{sellerEmail}</Row>
            <Row style={{ marginTop: "10px" }}>{gig.getDesc()}</Row>

            {items}
          </Col>
        </Row>
      </Container>
    );
  }

  switch (user.id) {
    // CASE: seller
    case gig.getSellerId():
      if (gig.getStatus() === "Open") {
        items = sellerOpenItems;
      } else if (gig.getStatus() === "InOrder") {
        items = sellerOrderItems;
      }
      break;
    // CASE: Buyer
    case gig.getBuyerId():
      items = buyerItems;
      break;
    // CASE: authenticated visitor
    default:
      if (gig.getStatus() === "Open") {
        items = visitorItems;
      }
  }

  return (
    <Container
      style={{ width: "65%", marginTop: "50px", marginBottom: "50px" }}
    >
      <Row>
        <Col>
          <img
            style={{ height: "300px", width: "300px" }}
            src={gig.getThumbnail().url()}
          />
        </Col>
        <Col style={{ marginLeft: "10px", width: "100%" }} xs={6}>
          <Row>
            <h1>{gig.getTitle()}</h1>
          </Row>
          <Row>
            <Button
              size='sm'
              variant='success'
              style={{ marginTop: "10px", marginLeft: "0px" }}
            >
              {gig.getStatus()}
            </Button>
          </Row>

          <Row style={{ marginTop: "10px" }}>{gig.getPrice()} EGLD</Row>
          <Row style={{ marginTop: "10px" }}>{sellerEmail}</Row>
          <Row style={{ marginTop: "10px" }}>{gig.getDesc()}</Row>

          {items}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewGig;
