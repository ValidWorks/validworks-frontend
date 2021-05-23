import React from "react";
import { useHistory } from "react-router";
import moralis from "moralis";

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
