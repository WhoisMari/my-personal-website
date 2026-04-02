import { Fragment } from "react";
import Container from "react-bootstrap/esm/Container";
import ReactMarkdown from "react-markdown";
import Loader from "../../components/UI/Loader";
import ErrorState from "../../components/UI/ErrorState";
import useAbout from "./hooks/useAbout";
import "../styles.scss";

const About = () => {
  const { data: aboutPost, isLoading, error } = useAbout();

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="wrap-about">
      <Container>
        {aboutPost && (
          <Fragment>
            <h1>{aboutPost.title}</h1>
            <ReactMarkdown>{aboutPost.content}</ReactMarkdown>
          </Fragment>
        )}
      </Container>
    </div>
  );
};

export default About;
