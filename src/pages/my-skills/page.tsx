import Container from "react-bootstrap/Container";
import ReactMarkdown from "react-markdown";
import Loader from "../../components/UI/Loader";
import ErrorState from "../../components/UI/ErrorState";
import useSkills from "./hooks/useSkills";
import "../styles.scss";

const Skills = () => {
  const { skillsPost, isLoading, error } = useSkills();

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="wrap-skills">
      <Container>
        <h1>My Skills</h1>
        <div className="row">
          <div className="col-md-6 col-12">
            {skillsPost && <ReactMarkdown>{skillsPost.content}</ReactMarkdown>}
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
                <em>Deployment: Git/Heroku/AWS/Railway/Vercel/Azure</em>
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
                  Other Skills: Self Hair Dying/Pickled
                  Onions/Karaoke/Guitar/Drawing/Baking
                </em>
                <div>
                  <span className="animation fadeInLeft"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Skills;
