import React, { useState, useEffect, useCallback, Fragment } from "react";
import Container from 'react-bootstrap/esm/Container';
import ReactMarkdown from 'react-markdown';
import Loader from '../components/UI/Loader';
import config from '../config.json';
import './styles.scss';

const About = () => {
	const [aboutPost, setAboutPost] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchAboutHandler = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${config.server_url}/about/`, {
				method: 'GET',
			});
			if (!response.ok) {
				throw new Error('Nothing to see here.');
			}
			const data = await response.json();
			setAboutPost(data);
		} catch(error) {
			console.log(error);
		}
		setIsLoading(false)
	}, []);

	useEffect(() => {
		fetchAboutHandler();
	}, [fetchAboutHandler]);

	return (
		<Fragment>
			{isLoading ? (
				<Loader />
			) : (
			<div className="wrap-about">
				<Container>
					{aboutPost &&
						<Fragment>
							<h1>{aboutPost.title}</h1>
							<ReactMarkdown children={aboutPost.content} />
						</Fragment>
					}
				</Container>
			</div>
			)}
		</Fragment> 
	);
};

export default About;