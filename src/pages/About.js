import GigCarousel from "../components/gig/GigCarousel";
import OrderCarousel from "../components/gig/OrderCarousel";
import ExploreCarousel from "../components/gig/ExploreCarousel";
import { useMoralis } from "react-moralis";

function About() {
  const { isAuthenticated } = useMoralis();

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        {isAuthenticated ? <GigCarousel /> : <div />}
      </div>
      <div style={{ marginTop: "50px" }}>
        {isAuthenticated ? <OrderCarousel /> : <div />}
      </div>
      <div style={{ marginTop: "50px" }}>
        <ExploreCarousel />
      </div>
    </div>
  );
}

export default About;
