import React from "react";
import { Link } from "react-router-dom";
import Moment from 'moment';
import ReactMarkdown from 'react-markdown';
import './PostCard.scss';

const PostCard = (props) => {
	Moment.locale('en');
	return (
		<div className="post-card">
			<Link to={`/blog/${props.slug}/`}>
				<div className="post-card-inner">
					<div className="post-card-image">
						<img src={props.thumbnail.substring(0, props.thumbnail.indexOf('?'))} alt={props.title} />
					</div>
					<div className="post-card-text">
						<div className="post-card-title">{props.title}</div>
						<div className="post-card-date">{Moment(props.date).format('MMM D, Y')}</div>
						<div className="post-card-intro"><ReactMarkdown children={props.intro} /></div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default PostCard;