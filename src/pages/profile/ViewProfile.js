import React from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import moralis from 'moralis'

const ViewProfile = () => {
  const currentUser = moralis.User.current()

  if (!currentUser) {
    return <Redirect to='/auth'/>
  }

  const profilePhotoUrl = currentUser.get("profilePhoto").url()
  const username = currentUser.get("username")
  const erdAddr = currentUser.get("erdAddress") ? currentUser.get("erdAddress") : "Not Linked yet"
  const email = currentUser.get("email")
  const bio = currentUser.get("bio")
  const activeListings = "Dummy Value"
  const completedOrders = "Dummy Value"

  return (
    <div>
      <Row className="g-3">
        <Col lg={3} md={12} sm={12}>
          <Card className="mb-3">
            <Card.Body>
            <div className="account-settings">
              <div className="user-profile d-flex flex-column align-items-center text-center">
                <div className="user-avatar">
                  <img src={profilePhotoUrl} className="rounded-circle" width="150" alt="Profile"/>
                </div>
                <div className="mt-3">
                  <h4 className="user-name">@{username}</h4>
                  <p>{bio}</p>
                  <a href="/profile/update" className="btn btn-outline-primary">Edit Profile</a>
                </div>
              </div>
            </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9} md={12} sm={12}>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <h6 className="mb-0">Email</h6>
                </Col>
                <Col sm={9} className="text-secondary">{email}</Col>
              </Row>
              <hr/>
              <Row>
                <Col sm={3}>
                  <h6 className="mb-0">Elrond Wallet</h6>
                </Col>
                <Col sm={9} className="text-secondary">{erdAddr}</Col>
              </Row>
              <hr/>
              <Row>
                <Col sm={3}>
                  <h6 className="mb-0">Active Listings</h6>
                </Col>
                <Col sm={9} className="text-secondary">{activeListings}</Col>
              </Row>
              <hr/>
              <Row>
                <Col sm={3}>
                  <h6 className="mb-0">Completed Orders</h6>
                </Col>
                <Col sm={9} className="text-secondary">{completedOrders}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    
  )
  
}

export default ViewProfile