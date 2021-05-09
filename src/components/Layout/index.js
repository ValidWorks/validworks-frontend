import React from "react";

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

import Footer from './Footer';
import Navbar from './Navbar';

function Layout({children}) {
  return (
		<Container className='p-3'>
			<Navbar />
			<div className="bg-light d-flex flex-column flex-fill wrapper">
				<Jumbotron>
					<main className="d-flex flex-column flex-grow-1">{children}</main>
				</Jumbotron>
			</div>
			<Footer />
		</Container>
  );
};

export default Layout;