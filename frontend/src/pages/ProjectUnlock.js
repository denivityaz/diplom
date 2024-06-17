import {useParams} from "react-router-dom";
import PayBtn from "../components/btnPay/PayBtn";
import {projects} from "./../helpers/projectsList"

const Project_unlock = () => {
	const {id} = useParams();
	const project = projects[id];

    return (
		<main className="section_animated">
			<div className="container">
				<div className="project-details">
					<h1 className="title-1">{project.title}</h1>

					<img
						src={project.imgBig}
						alt={project.title}
						className="project-details__cover"
					/>
					<video
            src='https://ik.imagekit.io/ikmedia/example_video.mp4'
            width='1440'
            height='680'
            controls
            autoPlay
            muted
            playsInline
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

export default Project_unlock;