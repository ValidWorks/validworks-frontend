import { Col, Row } from 'react-bootstrap'

import GigCard from '../../components/gig/GigCard'

const GigListings = (props) => {
  const gigs = props.gigs

  let cards = ""
  if (gigs && gigs.length > 0) {
    cards = (
      <Row>
        {gigs.map((gig, index) => (
          <Col lg={3} sm={6}>
            <GigCard key={index} gig={gig} />
          </Col>
        ))}
      </Row>
    )
  } else {
    cards = (
      <h2>There are no listed gigs yet. List one now?</h2>
    )
  }

  return (
    <div>
      {cards}
    </div>
  )
}

export default GigListings