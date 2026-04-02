import Container from "react-bootstrap/Container";
import PostsList from "../../components/Blog/PostsList";
import Loader from "../../components/UI/Loader";
import ErrorState from "../../components/UI/ErrorState";
import useBlog from "./hooks/useBlog";
import "../styles.scss";

const Blog = () => {
  const { data: posts, isLoading, error } = useBlog();

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="wrap-blog">
      <Container>
        <h1>Blog</h1>
        <PostsList posts={posts ?? []} />
      </Container>
    </div>
  );
};

export default Blog;
