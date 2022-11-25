import React, { Fragment, useCallback, useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import './ProjectCard.scss';
import "swiper/css/pagination";
import ProjectGallery from './ProjectGallery';
import config from '../../config.json';

const ProjectCard = (props) => {
	const [images, setImages] = useState([]);
	const [didMount, setDidMount] = useState(false);
	const [show, setShow] = useState(false);

	const handleShow = () => {
		setShow(true)
	};

	const handleHide = () => {
		setShow(false)
	};

	const fetchImagesHandler = useCallback(async () => {
		try {
			const response = await fetch(`${config.server_url}/images/${props.id}/`, {
				method: 'GET',
			});
			if (!response.ok) {
				throw new Error('Nothing to see here.');
			}
			const data = await response.json();
			setImages(data);
		} catch(error) {
			console.log(error);
		}
	}, [props.id]);

	useEffect(() => {
		fetchImagesHandler();
		setDidMount(true);
		return () => setDidMount(false);
	}, [fetchImagesHandler]);

	if(!didMount) {
		return null;
	}

	return (
		<Fragment>
			<div className="project-card">
				<div className="project-card-inner">
					<div className="images" onClick={handleShow}>
						<img src={props.thumb.substring(0, props.thumb.indexOf('?'))} alt={props.title} />
					</div>

					<div className="wrap-card-content">
						<div className="project-card-text">
							<div className="project-card-header">
								<div className="project-card-title">
								<a href={props.github} target="_blank" rel="noreferrer" alt="Github Page">
									{props.title}
								</a>
								</div>
							</div>
							<div className="project-card-content"><ReactMarkdown children={props.content} /></div>
						</div>
						<div className="project-card-actions" onClick={handleShow}>
							<a href={props.github} target="_blank" rel="noreferrer" alt="Github Page">
								<i className="fa-brands fa-github"></i> Github
							</a>
							<a href={props.website} target="_blank" rel="noreferrer" alt="Project Page">
								<i className="fa-solid fa-window-maximize"></i> Go to project
							</a>
							<span><i className="fa-solid fa-images"></i> Project Gallery</span>
						</div>
					</div>
				</div>
			</div>
			{show && 
				<ProjectGallery
					show={handleShow}
					onHide={handleHide}
					images={images}
					title={props.title}
				/>
			}
		</Fragment>
	);
};

export default ProjectCard;