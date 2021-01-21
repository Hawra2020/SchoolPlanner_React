import React from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from './Footer';
import Header from './Header';

function Layout({ children }) {
	return (
		<div className="layout-container">
			<ToastContainer />
			<div>
				<Header />
				<div>
					<main>{children}</main>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default Layout;
