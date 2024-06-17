import Project from '../components/project/Project';
import {projects} from "./../helpers/projectsList"


const Projects = () => {
	return (
		<main className="section_animated">
			<div className="container">
				<h2 className="title-1">Курсы</h2>
				<ul className="projects">
					{projects.map((project, index) => {
						return (
								<Project
								key={index}
								title={project.title}
								img={project.img}
								video={project.video}
								index={index}
							/>
						);
					})}
				</ul>
			</div>
		</main>
	);
};

export default Projects;
