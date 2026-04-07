import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import config from "../../config.json";
import { ProjectImage, ProjectTag } from "../../pages/projects/utils/types";
import ProjectGallery from "./ProjectGallery";
import "./ProjectCard.scss";
import "swiper/css";
import "swiper/css/pagination";

const serverBase = config.server_url.replace("/api", "");
function mediaUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path.split("?")[0];
  return `${serverBase}${path.split("?")[0]}`;
}

function useIsMobile(breakpoint = 992) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
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
  const isMobile = useIsMobile();

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

  const slideImages: ProjectImage[] =
    images.length > 0 ? images : [{ id: 0, image: thumb, caption: "" }];

  return (
    <>
      <div className="project-card">
        {isMobile ? (
          <div className="project-card-poster mobile-gallery">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              loop={slideImages.length > 1}
              className="card-gallery-swiper"
            >
              {slideImages.map((img, i) => (
                <SwiperSlide key={img.id || i}>
                  <img src={mediaUrl(img.image)} alt={img.caption || title} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="project-card-poster" onClick={() => setShow(true)}>
            <img src={mediaUrl(thumb)} alt={title} />
            {projectTags.length > 0 && (
              <div className="project-card-overlay">
                <div className="project-card-genre-tags">
                  {projectTags.map((t) => (
                    <span key={t.id} className="project-genre-tag">{t.title}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="project-card-body">
          <h3 className="project-card-title">{title}</h3>
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
            {!isMobile && (
              <span onClick={() => setShow(true)}>
                <i className="fa-solid fa-images" /> Gallery
              </span>
            )}
          </div>
        </div>
      </div>
      {!isMobile && show && (
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
