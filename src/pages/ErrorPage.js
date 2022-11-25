import React from "react";
import Container from 'react-bootstrap/esm/Container';
import './styles.scss';

const ErrorPage = () => {
	return (
		<div className='wrap-page-not-found'>
			<Container>
				<div className='message'>
					<h1>404</h1>
					<div>This is not the page you are looking for <i className="fa-regular fa-face-frown"></i></div>
				</div>
			</Container>
		</div>
	);
};

export default ErrorPage;