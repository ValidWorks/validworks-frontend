import React from "react";

import Container from "react-bootstrap/Container";

import Footer from "./Footer";
import Navbar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <Container fluid className='p-3'>
      <Navbar />

      <Container>
        <main className='d-flex flex-column flex-grow-1'>{children}</main>
      </Container>

      <Footer />
    </Container>
  );
};

export default Layout;
