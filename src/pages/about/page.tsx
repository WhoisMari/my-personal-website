import { Fragment } from "react";
import Container from "react-bootstrap/esm/Container";
import ReactMarkdown from "react-markdown";
import Loader from "../../components/UI/Loader";
import ErrorState from "../../components/UI/ErrorState";
import useAbout from "./hooks/useAbout";
import config from "../../config.json";
import "../styles.scss";

const serverBase = config.server_url.replace("/api", "");
function mediaUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path.split("?")[0];
  return `${serverBase}${path.split("?")[0]}`;
}

const About = () => {
  const { data: aboutPost, isLoading, error, facts } = useAbout();

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="wrap-about">
      <Container>
        {aboutPost && (
          <Fragment>
            <div className="about-page-layout">
              {aboutPost.thumbnail && (
                <div className="about-page-photo">
                  <img src={mediaUrl(aboutPost.thumbnail)} alt={aboutPost.title} />
                </div>
              )}
              <div className="about-page-text">
                <h1>{aboutPost.title}</h1>
                <ReactMarkdown>{aboutPost.content}</ReactMarkdown>
              </div>
            </div>
          </Fragment>
        )}
        {facts.length > 0 && (
          <section className="about-facts">
            <h2>A few things about me</h2>
            <div className="about-facts-grid">
              {facts.map((fact) => (
                <div key={fact.id} className="about-fact-card">
                  <div className="fact-title">{fact.title}</div>
                  <div className="fact-content">{fact.content}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
};

export default About;
