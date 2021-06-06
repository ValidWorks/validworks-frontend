import React from "react"

import Slider from "react-slick"
// Import css files
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import CategoryCard from "./CategoryCard"

const CategoryCarousel = (props) => {
  const cats = props.cats 

  // Carousel settings
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  let cards = ""
  if (cats && cats.length > 0) {
    cards = (
      <Slider {...settings}>
        {cats.map((cat, index) => (
          <div>
            <CategoryCard key={index} cat={cat} />
          </div>
        ))}
        {cats.length < 4 && Array(4 - cats.length).fill(<div />)}
      </Slider>
    )
  } else {
    cards = <div></div>;
  }

  return (
    <div>
      {cards}
    </div>
  );
};

export default CategoryCarousel;