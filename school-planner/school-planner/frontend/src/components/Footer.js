import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer className="footer bg-dark justify-self-end align-self-stretch">
			<div className="d-flex align-items-center justify-content-between py-3 px-1 px-sm-5">
				<span className="text-light">
					Copyright &copy; {new Date().getFullYear() - 1} -{' '}
					{new Date().getFullYear()} All rights are reserved by
					Hawra&nbsp;Saif
				</span>
				<span>
					<Link
						to="/about"
						className="text-light text-decoration-none"
					>
						About
					</Link>
					<span className="text-light">&nbsp;|&nbsp;</span>
					<Link
						to="/terms-and-conditions"
						className="text-light text-decoration-none"
					>
						Terms &amp; conditions
					</Link>
					<span className="text-light">&nbsp;|&nbsp;</span>
					<Link
						to="/privacy-policy"
						className="text-light text-decoration-none"
					>
						Privacy policy
					</Link>
				</span>
			</div>
		</footer>
	);
}

export default Footer;
