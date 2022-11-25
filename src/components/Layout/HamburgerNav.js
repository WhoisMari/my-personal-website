import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './HamburgerNav.scss';

const HamburgerNav = () => {
	return (
		<label className="menu-button-wrapper" htmlFor="">
			<input className="checkbox" type="checkbox" name="" id="" />
			<div className="icon-wrapper">
				<div className="hamburger-lines">
					<span className="line line1"></span>
					<span className="line line2"></span>
					<span className="line line3"></span>
				</div>
			</div>
			<div className="wrap-list">
				<div className="item-list">
					<Fragment>
						<Link to="/about/">About Me</Link>
						<Link to="/my-skills/">My Skills</Link>
						<Link to="/projects/">Projects</Link>
						<Link to="/blog/">Blog</Link>
					</Fragment>
				</div>
			</div>
		</label>
	);
};

export default HamburgerNav;