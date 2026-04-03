import Container from "react-bootstrap/Container";
import ReactMarkdown from "react-markdown";
import Loader from "../../components/UI/Loader";
import ErrorState from "../../components/UI/ErrorState";
import useSkills from "./hooks/useSkills";
import { SKILL_GROUPS } from "./utils/constants";
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
          <div className="col-md-6 col-12 skills-bio">
            {skillsPost && <ReactMarkdown>{skillsPost.content}</ReactMarkdown>}
          </div>
          <div className="col-md-6 col-12 skills-tags">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.label}
                className={`skill-group${group.muted ? " skill-group--muted" : ""}`}
              >
                <span className="skill-group-label">{group.label}</span>
                <div className="skill-group-tags">
                  {group.tags.map((t) => (
                    <span
                      key={t.label}
                      className={`skill-tag skill-tag--${t.variant}`}
                      data-tooltip={t.tooltip}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Skills;
