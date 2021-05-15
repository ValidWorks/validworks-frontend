import Button from 'react-bootstrap/Button'
import { Navbar as BsNavbar, Nav, NavbarBrand, Form, FormControl } from 'react-bootstrap'

// import { useMoralis } from 'react-moralis'
import moralis from 'moralis'

const Navbar = () => {
  // const { isAuthenticated, logout } = useMoralis()
  const currentUser = moralis.User.current()

  return (
    <BsNavbar className="bg-white border-bottom px-4 py-3">
      <div className="container-fluid">
        <NavbarBrand href="/" style={{textDecoration: "none"}}>
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
          { currentUser && <Nav.Link href="/gig/my_orders">My Orders</Nav.Link> }
          { currentUser && <Nav.Link href="/gig/my_gigs">My Gigs</Nav.Link> }
          { currentUser && <Nav.Link href="/gig/create">Create Gig</Nav.Link> }
          { currentUser && <Nav.Link href="/profile">Profile</Nav.Link> }
          
          <Nav.Item>
            { currentUser 
              ? <Button onClick={() => moralis.User.logOut().then(() => {
                  const currentUser = moralis.User.current()
                })}>Logout</Button>
              : <Nav.Link href="/auth">Sign In</Nav.Link>
            }
          </Nav.Item>
        </Nav>
      </div>
    </BsNavbar>
  )
}

export default Navbar;