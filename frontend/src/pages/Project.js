import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import PayBtn from "../components/btnPay/PayBtn";
import axios from 'axios';
import parse from 'html-react-parser';
import Cookies from 'js-cookie';

const Project = () => {
	const {id} = useParams();
    const [project, setProjects] = useState();
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    useEffect(() => {
        const fetchProjects = async () => {
            try {
				const token = Cookies.get('token')
				let config = {
					headers: {
						authorization: token, 
					}
				}
                const response = await axios.get('https://sponq.ru:3332/api/course/'+id,config);
                setProjects(response.data); 
                setLoading(false); 
            } catch (err) {
                setError(err.message); 
                setLoading(false); 
            }
        };

        fetchProjects();
    }, []); 
    if (loading) return <div>Загрузка...</div>; 
    if (error) return <div>Ошибка: {error}</div>; 
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
					<iframe
            			src={project.full_path || project.demo_path}
            			width='1280'
            			height='720'
						className="project-details__cover"
						frameBorder="0" 
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
						referrerPolicy="strict-origin-when-cross-origin" 
						title={project.title}
						allowFullScreen
			        />

					<div className="project-details__desc">
						<h2 className="title-2">Описание</h2>
						{parse(project.description)}
					</div>

					{project.demo_path && (
						<PayBtn link="" />
					)}
				</div>
			</div>
		</main>
	);
}

export default Project;