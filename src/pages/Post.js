import React, { useCallback, useState, useEffect } from "react";
import Container from 'react-bootstrap/esm/Container';
import { useParams } from "react-router-dom";
import Moment from 'moment';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import Loader from '../components/UI/Loader';
import config from '../config.json';
import './styles.scss';

const Post = () => {
	let { slug } = useParams();
	const [post, setPost] = useState();
	const [isLoading, setIsLoading] = useState(false);
	Moment.locale('en');

	const fetchProjectsHandler = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${config.server_url}/blog/${slug}/`, {
				method: 'GET',
			});
			if (!response.ok) {
				throw new Error('Nothing to see here.');
			}
			const data = await response.json();
			setPost(data);
		} catch(error) {
			console.log(error);
		}
		setIsLoading(false);
	}, [slug]);

	useEffect(() => {
		fetchProjectsHandler();
	}, [fetchProjectsHandler]);
	return (
		<div className="wrap-post">
			<Container>
				{isLoading && <Loader />}
				{post &&
					<div className="post-container">
						<h1 className="title">{post.title}</h1>
						<span className="date">{Moment(post.timestamp).format('MMM D, Y')}</span>
						<div className="post-content">
							<ReactMarkdown children={post.intro} />
							<ReactMarkdown
								children={post.content}
								components={{
									code({node, inline, className, children, ...props}) {
										const match = /language-(\w+)/.exec(className || '')
										return !inline && match && (
											<SyntaxHighlighter
												children={String(children).replace(/\n$/, '')}
												language={match[1]}
												PreTag="div"
											/>
										)
									}
								}}
							/>
						</div>
					</div>
				}
			</Container>
		</div>
	);
};

export default Post;