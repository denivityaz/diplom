import { NavLink } from 'react-router-dom';
import './style.css';

const Project = ({ title, img, index, userHave}) => {
	return (
		<NavLink to={`/project/${index}`}>
			<li className={userHave ? 'project have' : 'project'}>
				<img src={img} alt={title} className="project__img" />
				<h3 className="project__title">{title}</h3>
			</li>
		</NavLink>
	);
};

export default Project;
