import React, { useState, useEffect } from 'react';
import Project from '../components/project/Project';
import axios from 'axios';
import Cookies from 'js-cookie';

const Projects = () => {
    const [projects, setProjects] = useState([]);
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
                const response = await axios.get('http://185.218.0.16:3333/api/course/',config);
				const projects = response.data.sort((a,b) => b.userHave - a.userHave )
                setProjects(projects); 
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
                <h2 className="title-1">Курсы</h2>
                <ul className="projects">
                    {projects.map((project, index) => (
                        <Project
                            key={index}
                            title={project.title}
                            img={project.img_path}
                            video={project.full_path}
                            index={project.id}
							userHave={project.userHave}
                        />
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default Projects;
