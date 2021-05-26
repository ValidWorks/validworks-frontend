import React from "react";
import { useHistory } from "react-router";

const GigCard = ({ gig }) => {
  const history = useHistory();

  const id = gig.getId();
  const title = gig.getTitle();
  const price = gig.getPrice();
  const thumbnailUrl = gig.getThumbnail().url();

  let displayTitle = title;
  if (title.length > 30) {
    displayTitle =
      title.substring(0, 6) +
      "..." +
      title.substring(title.length - 24, title.length);
  }

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
        {displayTitle}
      </p>
      <hr
        style={{
          color: gig.getStatus() === "Open" ? "#28A745" : "#909090",
          backgroundColor: gig.getStatus() === "Open" ? "#28A745" : "#FFC107",
          height: 3,
          width: "80%",
          marginTop: "0px",
          marginBottom: "0px",
        }}
      />
      <p
        style={{
          fontSize: "16px",
          padding: "5px 0",
          marginTop: "2px",
        }}
      >
        {price} EGLD
      </p>
    </div>
  );
};

export default GigCard;
