import Button from 'react-bootstrap/Button';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';

import { useMoralis } from 'react-moralis';

function Navbar() {
  const { isAuthenticated, logout } = useMoralis();

  return (
    <BsNavbar className="bg-white border-bottom px-4 py-3">
      <div className="container-fluid">
        <NavItem className="d-flex align-items-center">
          <h1 className="dapp-name text-muted pl-2">ValidWorks</h1>
        </NavItem>

        <Nav className="ml-auto">
          <NavItem>
            { isAuthenticated 
              ? <Button onClick={() => logout()}>Logout</Button>
              : <a href='/auth'>Sign In</a>
            }
          </NavItem>
        </Nav>
      </div>
    </BsNavbar>
  )
}

export default Navbar;