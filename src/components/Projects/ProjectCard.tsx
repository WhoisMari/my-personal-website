import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import config from "../../config.json";
import { ProjectImage } from "../../pages/projects/utils/types";
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
}

const ProjectCard = ({
  id,
  title,
  thumb,
  content,
  github,
  website,
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
        <div className="project-card-inner">
          <div className="images" onClick={() => setShow(true)}>
            <img src={mediaUrl(thumb)} alt={title} />
          </div>
          <div className="wrap-card-content">
            <div className="project-card-text">
              <div className="project-card-header">
                <div className="project-card-title">
                  <a href={github} target="_blank" rel="noreferrer">
                    {title}
                  </a>
                </div>
              </div>
              <div className="project-card-content">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </div>
            <div className="project-card-actions">
              <a href={github} target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github"></i> Github
              </a>
              <a href={website} target="_blank" rel="noreferrer">
                <i className="fa-solid fa-window-maximize"></i> Go to project
              </a>
              <span onClick={() => setShow(true)}>
                <i className="fa-solid fa-images"></i> Project Gallery
              </span>
            </div>
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
