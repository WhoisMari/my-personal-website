import React, { Fragment, useEffect, useState, useCallback } from "react";
import PostsList from '../components/Blog/PostsList';
import Loader from '../components/UI/Loader';
import Container from 'react-bootstrap/Container'
import config from '../config.json';
import './styles.scss';

const Blog = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchPostsHandler = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${config.server_url}/blog/`, {
				method: 'GET',
			});
			if (!response.ok) {
				throw new Error('Nothing to see here.');
			}
			const data = await response.json();
			setPosts(data);
		} catch(error) {
			console.log(error);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchPostsHandler();
	}, [fetchPostsHandler]);

	return (
		<Fragment>
			{isLoading ? (
				<Loader />
			) : (
				<div className='wrap-blog'>
					<Container>
						<h1>Blog</h1>
						<PostsList posts={posts} />
					</Container>
				</div>
			)}
		</Fragment>
	);
};

export default Blog;