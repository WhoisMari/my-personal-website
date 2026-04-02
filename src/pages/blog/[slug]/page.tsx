import Container from "react-bootstrap/esm/Container";
import Moment from "moment";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { Components } from "react-markdown";
import Loader from "../../../components/UI/Loader";
import ErrorState from "../../../components/UI/ErrorState";
import usePost from "./hooks/usePost";
import "../../styles.scss";

Moment.locale("en");

const codeComponents: Components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const Post = () => {
  const { data: post, isLoading, error } = usePost();

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="wrap-post">
      <Container>
        {post && (
          <div className="post-container">
            <h1 className="title">{post.title}</h1>
            <span className="date">{Moment(post.timestamp).format("MMM D, Y")}</span>
            <div className="post-content">
              <ReactMarkdown>{post.intro}</ReactMarkdown>
              <ReactMarkdown components={codeComponents}>{post.content}</ReactMarkdown>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Post;
