import {
  Button,
  Modal,
  Navbar as BsNavbar,
  Nav,
  Form,
  Dropdown,
  NavbarBrand,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { connectLedger } from "../../utils/ErdjsUtils";

const Navbar = () => {
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  const [email, setEmail] = useState("");

  const submitForm = () => {
    user.set("email", email);
    user.save()
    handleClose();
  };

  const onLogout = () => {
    logout().then(() => {
      history.push("/");
    });
  };

  let displayAddress = "";
  let emailPlaceholder = "Enter email";
  let backdropBool = "static";
  if (isAuthenticated) {
    let address = user.get("erdAddress");
    displayAddress =
      address.substring(0, 6) +
      "..." +
      address.substring(address.length - 4, address.length);
    if (!user.get("email")) {
      if (show !== true) {
        handleShow();
      }
    }
    emailPlaceholder = user.get("email");
    backdropBool = true;
  }

  const loggedInItems = (
    <Nav className='ml-auto'>
      <Nav.Item>
        <Button
          onClick={() => {
            history.push("/gig/create");
          }}
          style={{ marginLeft: "10px" }}
          variant='outline-success'
        >
          Create Gig
        </Button>
      </Nav.Item>
      <Nav.Item>
        <Button
          onClick={() => {
            connectLedger();
          }}
          style={{ marginLeft: "10px" }}
          variant='outline-success'
        >
          Ledger Login
        </Button>
      </Nav.Item>
      <Nav.Item>
        <Dropdown style={{ marginLeft: "10px" }}>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            {displayAddress}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleShow}>Change contact</Dropdown.Item>
            <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    </Nav>
  );

  const loggedOutItems = (
    <Nav className='ml-auto'>
      <Nav.Item>
        <Button
          variant='outline-success'
          onClick={() =>
            authenticate({
              type: "erd",
              onError: err => alert(err)
            })
          }
        >
          Wallet Connect
        </Button>
      </Nav.Item>
    </Nav>
  );

  return (
    <BsNavbar className='bg-white border-bottom px-4 py-3'>
      <div className='container-fluid'>
        <NavbarBrand
          onClick={() => {
            history.push("/");
          }}
          style={{ textDecoration: "none" }}
        >
          <h3>
            <span style={{ color: "#28A745" }}>ValidWorks</span>
          </h3>
        </NavbarBrand>
        {isAuthenticated ? loggedInItems : loggedOutItems}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        backdrop={backdropBool}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Contact Info</Modal.Title>
        </Modal.Header>
        <Form
          style={{ marginLeft: "30px", marginRight: "30px", marginTop: "30px" }}
        >
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='email'
              placeholder={emailPlaceholder}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <Form.Text className='text-muted'>
              Users are advised to use a burner email to avoid spam.
            </Form.Text>
          </Form.Group>
          <Modal.Footer>
            <Button onClick={submitForm} variant='primary'>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </BsNavbar>
  );
};

export default Navbar;
