import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import ReactMarkdown from "react-markdown";
import Certificates from "../components/Certificate/Certificates";
import Loader from "../components/UI/Loader";
import config from "../config.json";
import "./styles.scss";

const Skills = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [skillsPost, setSkillsPost] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const getData = async (path) => {
    const response = await fetch(`${config.server_url}/${path}/`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const responses = await Promise.all([
        getData("my-skills"),
        getData("certificates"),
      ]);
      setSkillsPost(responses[0]);
      setCertificates(responses[1]);
      console.log(responses[1]);
      setIsLoading(false);
    } catch (error) {
      setServerError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrap-skills">
      {serverError && <div>{serverError}</div>}
      {!isLoading ? (
        <Container>
          <h1>My Skills</h1>
          <div className="row">
            <div className="col-md-6 col-12">
              {skillsPost && <ReactMarkdown children={skillsPost.content} />}
            </div>
            <div className="col-md-6 col-12">
              <ul>
                <li className="markup">
                  <em>Markup: HTML5/SASS/Bootstrap/Markdown</em>
                  <div>
                    <span className="animation fadeInLeft"></span>
                  </div>
                </li>
                <li className="frontend">
                  <em>Frontend: JavaScript (ES6/ReactJS/Next.js/)</em>
                  <div>
                    <span className="animation fadeInLeft"></span>
                  </div>
                </li>
                <li className="backend">
                  <em>Backend: Python (Django/Django REST/Flask)</em>
                  <div>
                    <span className="animation fadeInLeft"></span>
                  </div>
                </li>
                <li className="deployment">
                  <em>Deployment: Git/Heroku/AWS/Railway/Vercel</em>
                  <div>
                    <span className="animation fadeInLeft"></span>
                  </div>
                </li>
                <li className="sql">
                  <em>SQL: PostgreSQL/SQLite</em>
                  <div>
                    <span className="animation fadeInLeft"></span>
                  </div>
                </li>
                <li className="other">
                  <em>
                    Other Skills: Hair Dying/Pickled
                    Onions/Karaoke/Guitar/Drawing
                  </em>
                  <div>
                    <span className="animation fadeInLeft"></span>
                  </div>
                </li>
              </ul>
              {certificates.length > 0 && (
                <div className="row">
                  <Certificates items={certificates} />
                </div>
              )}
            </div>
          </div>
        </Container>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Skills;
