import React, { Fragment, useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ProjectCard from '../components/Projects/ProjectCard';
import Loader from '../components/UI/Loader';
import config from '../config.json';

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [didMount, setDidMount] = useState(false);

	const fetchProjectsHandler = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${config.server_url}/projects/`, {
				method: 'GET',
			});
			if (!response.ok) {
				throw new Error('Nothing to see here.');
			}
			const data = await response.json();
			setProjects(data);
			console.log(data);
		} catch(error) {
			console.log(error);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchProjectsHandler();
		setDidMount(true);
		return () => setDidMount(false);
	}, [fetchProjectsHandler]);

	if(!didMount) {
		return null;
	}

	return (
		<div className="wrap-projects">
			<Container>
				{isLoading &&
					<Loader />
				}
				{projects.length > 0 &&
					<Fragment>
						<h1>Projects</h1>
						{projects.map((project) => (
							<ProjectCard
								key={project.id}
								title={project.title}
								thumb={project.thumbnail}
								content={project.content}
								website={project.link}
								github={project.github}
								id={project.id}
							/>
						))}
					</Fragment>
				}
			</Container>
		</div>
	);
};

export default Projects;