import Modal from "react-bootstrap/Modal";
import { Carousel } from "react-carousel-minimal";
import { ProjectImage } from "../../pages/projects/utils/types";

interface ProjectGalleryProps {
  show: boolean;
  onHide: () => void;
  images: ProjectImage[];
  title: string;
}

const ProjectGallery = ({ show, onHide, images, title }: ProjectGalleryProps) => {
  const data = images.map((img) => ({
    image: img.image.substring(0, img.image.indexOf("?")),
    caption: img.caption,
  }));

  return (
    <Modal size="xl" show={show} onHide={onHide} scrollable animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>{title}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel
          data={data}
          width="100%"
          automatic={false}
          captionPosition="bottom"
          dots={true}
          slideBackgroundColor="#fbfaf9"
        />
      </Modal.Body>
    </Modal>
  );
};

export default ProjectGallery;
