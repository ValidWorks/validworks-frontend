import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { useMoralis } from "react-moralis";

import { orderGig, selectGigById } from "../../utils/GigUtils";

const OrderGig = ({ match }) => {
  const { gigId } = match.params;

  const [gig, setGig] = useState();
  const { isAuthenticated, user } = useMoralis();

  const history = useHistory();

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

  if (!isAuthenticated) {
    return <Redirect to='/auth' />;
  }

  if (user.id === gig.getSellerId()) {
    return <h2>You cannot order your own listing!</h2>;
  }

  // TODO: make this into a custom error page
  if (!gig) {
    return <h2>Gig not found!</h2>;
  }

  const onOrderGig = (event) => {
    // Call the erdjs api: needs gig id and the seller id
    try {
      orderGig(gigId, user.id, gig.getSellerId()).then(() => {
        console.log("Successfully ordered gig:", gigId);
        history.push("/gig/order/success");
      });
    } catch (error) {
      console.error("Error ordering gig: ", gigId);
    }
  };

  return (
    <div>
      <h2>{gig.getTitle()}</h2>
      <div>
        <span>{gig.getSellerId()}</span>
      </div>

      <Button variant='primary' onClick={onOrderGig}>
        Checkout
      </Button>
    </div>
  );
};

export default OrderGig;
