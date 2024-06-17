import {useParams} from "react-router-dom";
import PayBtn from "../components/btnPay/PayBtn";
import {projects} from "./../helpers/projectsList"

const Project = () => {
	const {id} = useParams();
	const project = projects[id];

    return (
		<main className="section_animated">
			<div className="container">
				<div className="project-details">
					<h1 className="title-1">{project.title}</h1>

					{/* <img
						src={project.imgBig}
						alt={project.title}
						className="project-details__cover"
					/> */}
					<video
            			src={project.video}
            			width='1280'
            			height='720'
            			controls
            			autoPlay
						className="project-details__cover"
            			// muted
            			playsInline
						poster= {project.imgBig}
			        />

					<div className="project-details__desc">
						<h2 className="title-2">Описание</h2>
						<p>{project.skills}</p>
					</div>

					{project.payLink && (
						<PayBtn link="" />
					)}
				</div>
			</div>
		</main>
	);
}

export default Project;