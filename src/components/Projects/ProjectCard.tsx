import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import config from "../../config.json";
import { ProjectImage, ProjectTag } from "../../pages/projects/utils/types";
import ProjectGallery from "./ProjectGallery";
import "./ProjectCard.scss";
import "swiper/css/pagination";

const serverBase = config.server_url.replace("/api", "");
function mediaUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path.split("?")[0];
  return `${serverBase}${path.split("?")[0]}`;
}

interface ProjectCardProps {
  id: number;
  title: string;
  thumb: string;
  content: string;
  github: string;
  website: string;
  stackTags: ProjectTag[];
  projectTags: ProjectTag[];
}

const ProjectCard = ({
  id,
  title,
  thumb,
  content,
  github,
  website,
  stackTags,
  projectTags,
}: ProjectCardProps) => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [show, setShow] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch(`${config.server_url}/images/${id}/`);
      if (!response.ok) throw new Error("Failed to load images");
      const data: ProjectImage[] = await response.json();
      setImages(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <>
      <div className="project-card">
        <div className="project-card-poster" onClick={() => setShow(true)}>
          <img src={mediaUrl(thumb)} alt={title} />
          <div className="project-card-overlay">
            {projectTags.length > 0 && (
              <div className="project-card-genre-tags">
                {projectTags.map((t) => (
                  <span key={t.id} className="project-genre-tag">{t.title}</span>
                ))}
              </div>
            )}
            <h3 className="project-card-title">{title}</h3>
          </div>
        </div>
        <div className="project-card-body">
          <div className="project-card-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          {stackTags.length > 0 && (
            <div className="project-card-stack">
              {stackTags.map((t) => (
                <span key={t.id} className="project-stack-tag">{t.title}</span>
              ))}
            </div>
          )}
          <div className="project-card-actions">
            <a href={github} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github" /> GitHub
            </a>
            <a href={website} target="_blank" rel="noreferrer">
              <i className="fa-solid fa-arrow-up-right-from-square" /> Live demo
            </a>
            <span onClick={() => setShow(true)}>
              <i className="fa-solid fa-images" /> Gallery
            </span>
          </div>
        </div>
      </div>
      {show && (
        <ProjectGallery
          show={show}
          onHide={() => setShow(false)}
          images={images}
          title={title}
        />
      )}
    </>
  );
};

export default ProjectCard;
