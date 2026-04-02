import { Post } from "../../pages/blog/utils/types";
import PostCard from "./PostCard";

interface PostsListProps {
  posts: Post[];
}

const PostsList = ({ posts }: PostsListProps) => (
  <div className="wrap-all-posts">
    {posts.map((post) => (
      <PostCard
        key={post.id}
        title={post.title}
        intro={post.intro}
        slug={post.slug}
        thumbnail={post.thumbnail}
        date={post.timestamp}
      />
    ))}
  </div>
);

export default PostsList;
