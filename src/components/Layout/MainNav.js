import React from 'react';
import { Link } from 'react-router-dom';
import './MainNav.scss';

const MainNav = () => {
	return (
		<div className="wrap-nav">
			<Link to="/about/">About Me</Link>
			<Link to="/my-skills/">My Skills</Link>
			<Link to="/projects/">Projects</Link>
			<Link to="/blog/">Blog</Link>
		</div>
	);
};

export default MainNav;