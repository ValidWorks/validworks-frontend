import React from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GigCard from "./GigCard";

import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { selectGigsByBuyerId } from "../../utils/GigUtils";

import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

const OrderCarousel = () => {
  // Load gigs
  const { user } = useMoralis();
  const buyerId = user.id;

  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    try {
      selectGigsByBuyerId(buyerId).then((g) => setGigs(g.reverse()));
    } catch (err) {
      console.log("Error retrieving gig", err);
    }
  }, [buyerId]);

  // Carousel settings
  var settings = {
    dots: true,
    speed: 500,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  let cards = "";
  if (gigs && gigs.length > 0) {
    cards = (
      <Slider {...settings}>
        {gigs.map((gig, index) => (
          <div>
            <GigCard key={index} gig={gig} />
          </div>
        ))}
        {gigs.length < 5 && Array(5 - gigs.length).fill(<div />)}
      </Slider>
    );
  } else {
    cards = <div></div>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: "50px" }}>My Orders</h1>
      {cards}
    </div>
  );
};

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "#28A745", fontSize: "30px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "#28A745", fontSize: "30px" }} />
    </div>
  );
};

export default OrderCarousel;
