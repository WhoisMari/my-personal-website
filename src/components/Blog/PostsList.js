import React from "react";
import PostCard from './PostCard';

const PostsList = (props) => {
	return (
		<div className='wrap-all-posts'>
			{props.posts.map((post) => (
				<PostCard
					key={post.id}
					title={post.title}
					intro={post.intro}
					content={post.content}
					slug={post.slug}
					thumbnail={post.thumbnail}
					date={post.timestamp}
				/>
			))}
		</div>
	);
};

export default PostsList;