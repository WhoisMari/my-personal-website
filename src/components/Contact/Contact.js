import React from "react";
import Container from 'react-bootstrap/esm/Container';
import './Contact.scss';

const Contact = () => {
	return (
		<div className="wrap-contact">
			<Container>
				<div className="contact-container">
					<h1>Contact</h1>
					<p>
						If you want to collaborate on a project or just talk, 
						send me a <a href='mail&#116;o&#58;m&#37;66il&#37;69&#112;&#112;o%7&#65;z%&#54;90&#64;g&#109;ai%&#54;C&#46;%6&#51;%6Fm'>message!</a>
					</p>
					<div className="wrap-social">
						<a href='mail&#116;o&#58;m&#37;66il&#37;69&#112;&#112;o%7&#65;z%&#54;90&#64;g&#109;ai%&#54;C&#46;%6&#51;%6Fm'>
							<i className="fas fa-envelope"></i>
						</a>
						<a 
							href="https://www.instagram.com/mari_pozzi16/" 
							target="_blank" 
							rel="noreferrer"
						>
							<i className="fab fa-instagram"></i>
						</a>
						<a 
							href="https://twitter.com/__whoismari__" 
							target="_blank" rel="noreferrer"
						>
							<i className="fab fa-twitter"></i>
						</a>
						<a 
							href="https://github.com/WhoisMari" 
							target="_blank" 
							rel="noreferrer"
						>
							<i className="fab fa-github"></i>
						</a>					
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Contact;