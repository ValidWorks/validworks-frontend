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
import { selectGigById } from "../utils/GigUtils";
import { getEmailByUserId } from "../utils/UserUtils";
import { useHistory } from "react-router";

const ViewGig = (props) => {
  const { isAuthenticated, user } = useMoralis();
  const history = useHistory();
  const [gig, setGig] = useState();
  const { gigId } = props.match.params;
  const [email, setEmail] = useState("");
  const [gigStatus, setGigStatus] = useState('')

  useEffect(() => {
    try {
      selectGigById(gigId).then((gig) => {
        console.log("Gig successfully retrieved");
        setGig(gig);
        setGigStatus(gig.getStatus())
        getEmailByUserId(gig.getSellerId())
          .then((sellerEmail) => {
            console.log("sellerid" + gig.getSellerId);
            console.log("selleremail" + sellerEmail);
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
        console.log(reply.getHash().toString());
        console.log(reply.getStatus().isSuccessful());
        if (reply.getStatus().isSuccessful()) {
          gig.setStatus("In Order");
          gig.setBuyerId(user.id);
          setGigStatus(gig.getStatus())
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deliver = () => {
    sellerDeliver(user.get("erdAddress"), gig.getOnChainId())
      .then((reply) => {
        console.log(reply.getHash().toString());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Ends Order
  const claim = () => {
    sellerClaim(user.get("erdAddress"), gig.getOnChainId())
      .then((reply) => {
        console.log(reply.getHash().toString());
        if (reply.getStatus().isSuccessful()) {
          gig.setStatus("Open");
          setGigStatus(gig.getStatus())
          gig.removeBuyerId();
        }
        console.log(reply.getHash().toString());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlist = () => {
    sellerUnlist(user.get("erdAddress"), gig.getOnChainId())
      .then((reply) => {
        console.log(reply.getHash().toString());
        if (reply.getStatus().isSuccessful()) {
          // remove listing
          gig
            .destroy()
            .then((gig) => {
              console.log("Gig succesfully unlisted");
              history.push("/");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const accept = () => {
    buyerAccept(user.get("erdAddress"), gig.getOnChainId(), gig.getSellerAddr())
      .then((reply) => {
        console.log(reply.getHash().toString());
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
        console.log(reply.getHash().toString());
        if (reply.getStatus().isSuccessful()) {
          gig.setStatus("Open");
          setGigStatus(gig.getStatus())
          gig.removeBuyerId();
        }
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
        console.log(reply.getHash().toString());
        if (reply.getStatus().isSuccessful()) {
          gig.setStatus("Open");
          setGigStatus(gig.getStatus())
          gig.removeBuyerId();
        }
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
    </Row>
  );
  // seller & Open
  // Unlist
  let sellerOpenItems = (
    <Row style={{ marginTop: "60px" }}>
      <Button
        onClick={unlist}
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
              alt='gig thumbnail'
              style={{ height: "300px", width: "300px" }}
              src={gig.getThumbnail().url()}
            />
          </Col>
          <Col style={{ marginLeft: "10px", width: "100%" }} xs={6}>
            <Row style={{ width: "100%", marginBottom: "0px" }}>
              <Col xs='8' style={{ margin: "0px", padding: "0px" }}>
                <h1 className='d-flex'>{gig.getTitle()}</h1>
              </Col>
              <Col xs='4' style={{ marginLeft: "0px", paddingLeft: "0px" }}>
                <Button
                  size='sm'
                  variant={gig.getStatus() === "Open" ? "success" : "warning"}
                  style={{ marginTop: "10px", marginLeft: "20px" }}
                >
                  {gigStatus}
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
            <Row style={{ marginTop: "10px" }}>
              Delivery Time:{" "}
              {gig.getDeliveryTime() ? gig.getDeliveryTime() : "undefined"} Days
            </Row>
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
            alt='gig thumbnail'
            style={{ height: "300px", width: "300px" }}
            src={gig.getThumbnail().url()}
          />
        </Col>
        <Col style={{ marginLeft: "10px", width: "100%" }} xs={6}>
          <Row style={{ width: "100%", marginBottom: "0px" }}>
            <Col xs='8' style={{ margin: "0px", padding: "0px" }}>
              <h1 className='d-flex'>{gig.getTitle()}</h1>
            </Col>
            <Col xs='4' style={{ marginLeft: "0px", paddingLeft: "0px" }}>
              <Button
                variant={gig.getStatus() === "Open" ? "success" : "warning"}
                size='sm'
                style={{ marginTop: "10px", marginLeft: "20px" }}
              >
                {gigStatus}
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
          <Row style={{ marginTop: "10px" }}>
            Delivery Time:{" "}
            {gig.getDeliveryTime() ? gig.getDeliveryTime() : "undefined"} Days
          </Row>
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
