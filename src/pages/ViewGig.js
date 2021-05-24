import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useMoralis } from "react-moralis";
import {
  buyerOrder,
  sellerClaim,
  sellerUnlist,
  sellerDeliver,
  buyerRefund,
  buyerDispute,
  buyerAccept,
} from "../utils/ErdjsUtils";
// import TimeAgo from '../../components/gig/TimeAgo'
import { selectGigById, getBuyerId } from "../utils/GigUtils";
import { getEmailByUserId, getUserById } from "../utils/UserUtils";

const ViewGig = (props) => {
  const { isAuthenticated, user } = useMoralis();
  const [gig, setGig] = useState();
  const { gigId } = props.match.params;
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      selectGigById(gigId).then((gig) => {
        console.log("Gig successfully retrieved");
        setGig(gig);
        getEmailByUserId(gig.getSellerId())
          .then((sellerEmail) => {
            setEmail(sellerEmail);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (err) {
      console.log("Error retrieving gig", err);
    }
  }, [gigId]);

  if (!gig) {
    return <div></div>;
  }

  const order = () => {
    buyerOrder(
      user.get("erdAddress"),
      gig.getOnChainId(),
      gig.getSellerAddr(),
      gig.getPrice() * 1.2
    )
      .then((reply) => {
        console.log(reply.getHash().hash);
        gig.setStatus("In Order");
        gig.setBuyerId(user.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deliver = () => {
    sellerDeliver(user.get("erdAddress"), gig.getOnChainId())
      .then((reply) => {
        console.log(reply.getHash().hash);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Ends Order
  const claim = () => {
    sellerClaim(user.get("erdAddress"), gig.getOnChainId())
      .then((reply) => {
        console.log(reply.getHash().hash);
        gig.setStatus("Open");
        gig.removeBuyerId();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlist = () => {
    sellerUnlist(user.get("erdAddress"), gig.getOnChainId())
      .then((reply) => {
        console.log(reply.getHash().hash);
        // remove listing
        gig
          .destroy()
          .then((gig) => {
            console.log("Gig succesfully unlisted");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const accept = () => {
    buyerAccept(user.get("erdAddress"), gig.getOnChainId(), gig.getSellerAddr())
      .then((reply) => {
        console.log(reply.getHash().hash);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Ends order
  const refund = () => {
    buyerRefund(user.get("erdAddress"), gig.getOnChainId(), gig.getSellerAddr())
      .then((reply) => {
        console.log(reply.getHash().hash);
        gig.setStatus("Open");
        gig.removeBuyerId();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Ends order
  const dispute = () => {
    buyerDispute(
      user.get("erdAddress"),
      gig.getOnChainId(),
      gig.getSellerAddr()
    )
      .then((reply) => {
        console.log(reply.getHash().hash);
        gig.setStatus("Open");
        gig.removeBuyerId();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // DEFAULT
  // unauthenticated visitor & Open
  // unauthenticated visitor & In Order
  // authenticated visitor & In Order
  let items = <Row></Row>;
  // authenticated visitor & Open
  // Order
  let visitorItems = (
    <Row style={{ marginTop: "60px" }}>
      <Button
        onClick={order}
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Order
      </Button>
    </Row>
  );
  // seller & In Order
  // Deliver Claim
  let sellerOrderItems = (
    <Row style={{ marginTop: "60px" }}>
      <Button
        onClick={deliver}
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Deliver
      </Button>

      <Button
        onClick={claim}
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Claim
      </Button>

      <Button
        onClick={unlist}
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
        onClick={refund}
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Refund
      </Button>

      <Button
        onClick={dispute}
        variant='outline-success'
        style={{ marginLeft: "5px", width: "80px" }}
      >
        Dispute
      </Button>

      <Button
        onClick={accept}
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
            <Row style={{ width: "50%", marginBottom: "0px" }}>
              <Col style={{ margin: "0px", padding: "0px" }}>
                <h1>{gig.getTitle()}</h1>
              </Col>
              <Col style={{ marginLeft: "0px", paddingLeft: "0px" }}>
                <Button
                  size='sm'
                  variant='success'
                  style={{ marginTop: "10px", marginLeft: "20px" }}
                >
                  {gig.getStatus()}
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: "0px" }}>
              <a
                href={
                  "https://testnet-explorer.elrond.com/transactions/" +
                  gig.getListTxHash()
                }
              >
                id: {gig.getOnChainId()}
              </a>
            </Row>

            <Row style={{ marginTop: "10px" }}>{gig.getPrice()} EGLD</Row>
            <Row style={{ marginTop: "10px" }}>{email}</Row>

            {items}
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", marginLeft: "10px" }}>
          <Col>
            <Row>
              <h2>Description</h2>
            </Row>
            <Row>
              {" "}
              <p>{gig.getDesc()}</p>
            </Row>
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
      } else if (gig.getStatus() === "In Order") {
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
          <Row style={{ width: "50%", marginBottom: "0px" }}>
            <Col style={{ margin: "0px", padding: "0px" }}>
              <h1>{gig.getTitle()}</h1>
            </Col>
            <Col style={{ marginLeft: "0px", paddingLeft: "0px" }}>
              <Button
                size='sm'
                variant='success'
                style={{ marginTop: "10px", marginLeft: "20px" }}
              >
                {gig.getStatus()}
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "0px" }}>
            <a
              href={
                "https://testnet-explorer.elrond.com/transactions/" +
                gig.getListTxHash()
              }
            >
              id: {gig.getOnChainId()}
            </a>
          </Row>

          <Row style={{ marginTop: "10px" }}>{gig.getPrice()} EGLD</Row>
          <Row style={{ marginTop: "10px" }}>{email}</Row>

          {items}
        </Col>
      </Row>
      <Row style={{ marginTop: "30px", marginLeft: "10px" }}>
        <Col>
          <Row>
            <h2>Description</h2>
          </Row>
          <Row>
            {" "}
            <p>{gig.getDesc()}</p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewGig;
