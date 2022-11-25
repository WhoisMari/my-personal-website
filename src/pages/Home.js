import React,  { Fragment } from "react";
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import config from '../config.json';
import 'animate.css';
import './styles.scss';

const Home = () => {
	return (
		<Fragment>
			<div className='wrap-about'>
				<Container>
					<div className='about-container animate__animated animate__fadeIn'>
						<div className='about-text'>
							<div className='hello'>
								Hello world, I'm Mariana! 
							</div>
							<div className='who-this'>
								An aspiring Full-Stack Developer.
								<p>More about <Link to='/about/'>me</Link>, <Link to='/my-skills/'>my skills</Link> and <Link to='/projects/'>my projects</Link>.</p>
							</div>
						</div>
						<img src={`${config.aws_url}/pink-hair-profilepic.jpg`} alt="" />
					</div>
				</Container>
			</div>
		</Fragment>
	);
};

export default Home;