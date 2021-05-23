import React from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GigCard from "./GigCard";

import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { listGigs } from "../../utils/GigUtils";

import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

const ExploreCarousel = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    try {
      listGigs().then((g) => {
        setGigs(g);
      });
    } catch (err) {
      console.log("Error retrieving gig", err);
    }
  }, [gigs]);

  // Carousel settings
  var settings = {
    infinite: true,
    speed: 500,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  let cards = "";
  if (gigs && gigs.length > 0) {
    cards = (
      <div>
        {gigs.map((gig, index) => (
          <div>
            <GigCard key={index} gig={gig} />
          </div>
        ))}
      </div>
    );
  } else {
    cards = <div>You have not listed any gigs yet. List one now?</div>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: "50px" }}>Explore</h1>
      <Slider {...settings}>
        {gigs.map((gig, index) => (
          <div>
            <GigCard key={index} gig={gig} />
          </div>
        ))}
      </Slider>
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

export default ExploreCarousel;
