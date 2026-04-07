import Container from "react-bootstrap/Container";
import ProjectCard from "../../components/Projects/ProjectCard";
import Loader from "../../components/UI/Loader";
import ErrorState from "../../components/UI/ErrorState";
import useProjects from "./hooks/useProjects";

const Projects = () => {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="wrap-projects">
      <Container>
        <h1>Projects</h1>
        <div className="projects-grid">
        {(projects ?? []).map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            thumb={project.thumbnail}
            content={project.content}
            website={project.link}
            github={project.github}
            id={project.id}
            stackTags={project.stack_tags ?? []}
            projectTags={project.project_tags ?? []}
          />
        ))}
        </div>
      </Container>
    </div>
  );
};

export default Projects;
