import React from 'react';
import Modal from 'react-bootstrap/Modal/';
import { Carousel } from 'react-carousel-minimal';

const ProjectGallery = (props) => {
	const data = []
	props.images.forEach(image => {
		data.push({'image': image.image.substring(0, image.image.indexOf('?')), 'caption': image.caption});
	});
	return (
		<Modal 
			size='xl'
			show={props.show}
			onHide={props.onHide}
			scrollable={true}
			animation={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>
					<h3>{props.title}</h3>
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