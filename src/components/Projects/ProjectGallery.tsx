import Modal from "react-bootstrap/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import config from "../../config.json";
import { ProjectImage } from "../../pages/projects/utils/types";
import "./ProjectGallery.scss";

const serverBase = config.server_url.replace("/api", "");
function mediaUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path.split("?")[0];
  return `${serverBase}${path.split("?")[0]}`;
}

interface ProjectGalleryProps {
  show: boolean;
  onHide: () => void;
  images: ProjectImage[];
  title: string;
}

const ProjectGallery = ({ show, onHide, images, title }: ProjectGalleryProps) => (
  <Modal size="xl" show={show} onHide={onHide} animation={false} className="gallery-modal">
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="gallery-modal-body">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={images.length > 1}
        className="gallery-swiper"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="gallery-slide">
              <img src={mediaUrl(img.image)} alt={img.caption || title} />
              {img.caption && <p className="gallery-caption">{img.caption}</p>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Modal.Body>
  </Modal>
);

export default ProjectGallery;
