import { useEffect, useState } from 'react'
import { Button, Navbar as BsNavbar, Nav, NavbarBrand, Form, FormControl, NavDropdown } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router'
import moralis from 'moralis'

const Navbar = () => {
  const history = useHistory()
  const location = useLocation()

  const [currentUser, setCurrentUser] = useState(moralis.User.current())

  useEffect(() => {
    setCurrentUser(moralis.User.current())
  }, [location])

  const onLogout = (event) => {
    moralis.User.logOut().then(() => {
      setCurrentUser(moralis.User.current())
      history.push('/')
    })
  }

  const loggedInItems = (
    <NavDropdown title="Account">
      <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/gig/create">Create Gig</NavDropdown.Item>
      <NavDropdown.Item href="/gig/my_orders">My Orders</NavDropdown.Item>
      <NavDropdown.Item href="/gig/my_gigs">My Gigs</NavDropdown.Item>
      <NavDropdown.Divider />
      {/* <NavDropdown.Item href="/auth/logout">Logout</NavDropdown.Item> */}
      <NavDropdown.Item><Button onClick={onLogout}>Logout</Button></NavDropdown.Item>
    </NavDropdown>
  )

  const loggedOutItems = (
    <Nav.Item>
      <Nav.Link href="/auth">Sign In</Nav.Link>
    </Nav.Item>
  )

  return (
    <BsNavbar className="bg-white border-bottom px-4 py-3">
      <div className="container-fluid">
        <NavbarBrand href="/" style={{textDecoration: "none", color: "#28A745"}}>
            <h3>
              <span>
              ValidWorks
              </span>
            </h3>
        </NavbarBrand>
        
        <Nav className="ml-auto">
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>

          <Nav.Link href="/explore">Explore</Nav.Link>
          { currentUser ? loggedInItems : loggedOutItems }
        </Nav>
      </div>
    </BsNavbar>
  )
}

export default Navbar;