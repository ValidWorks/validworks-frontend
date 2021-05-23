import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useMoralis } from "react-moralis";
// import TimeAgo from '../../components/gig/TimeAgo'
import { selectGigById } from "../utils/GigUtils";

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
            <Row style={{ marginTop: "10px" }}>{gig.getDesc()}</Row>
          </Col>
        </Row>
      </Container>
    );
  }

  let sellerItems = (
    <Row style={{ marginTop: "80px" }}>
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

  let buyerItems = (
    <Row style={{ marginTop: "80px" }}>
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

  let publicItems = (
    <Row style={{ marginTop: "80px" }}>
      <Button
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Order
      </Button>
    </Row>
  );

  let items = <Row></Row>; // Initialise empty
  if ((user.id == gig.getSellerId()) & (gig.getStatus() == "Open")) {
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
            <Row style={{ marginTop: "10px" }}>{gig.getDesc()}</Row>
            <Row style={{ marginTop: "80px" }}>
              <Button
                variant='outline-success'
                style={{ marginLeft: "5px", width: "80px" }}
              >
                Unlist
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  } else if ((user.id == gig.getSellerId()) & (gig.getStatus() == "InOrder")) {
    items = sellerItems;
  }
  if (!gig.getBuyerId()) {
    console.log("not seller");
    if (gig.getStatus() == "Open") {
      console.log("not buyer or seller");
      items = publicItems;
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
              <Row style={{ marginTop: "10px" }}>{gig.getDesc()}</Row>

              {items}
            </Col>
          </Row>
        </Container>
      );
    }
  } else if ((user.id == gig.getBuyerId()) & (gig.getStatus() == "InOrder")) {
    items = buyerItems;
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
          <Row style={{ marginTop: "10px" }}>{gig.getDesc()}</Row>

          {sellerItems}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewGig;
