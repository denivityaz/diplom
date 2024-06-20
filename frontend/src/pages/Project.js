import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import PayBtn from "../components/btnPay/PayBtn";
import axios from 'axios';
import parse from 'html-react-parser';
import Cookies from 'js-cookie';
import Modal from 'react-modal';

const Project = () => {
	const {id} = useParams();
    const [project, setProjects] = useState();
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalAnimationClass, setModalAnimationClass] = useState('');
	const [name, setName] = useState('');
	const [contactMethod, setContactMethod] = useState('');
	const [message, setMessage] = useState('');
	const [contactError, setContactError] = useState('');
	useEffect(() => {
		if (modalIsOpen) {
		  setModalAnimationClass('modal--open');
		} else if (modalAnimationClass) {
		  setModalAnimationClass('modal--close');
		}
	  }, [modalIsOpen]);
  
	  const openModal = () => {
		setModalIsOpen(true);
	  };
  
	  const closeModal = () => {
		setModalIsOpen(false);
		setTimeout(() => {
		  setName('');
		  setContactMethod('');
		  setMessage('');
		  setContactError('');
		}, 300); // Длительность анимации
	  };

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
					
					<div>
					<Modal
							isOpen={modalIsOpen}
							onRequestClose={closeModal}
							className={`modal ${modalAnimationClass}`}
							overlayClassName="overlay"
							contentLabel="Форма записи"
							closeTimeoutMS={300}
		  				>
							<h2 className="title-2">Покупка курса</h2>
							<form 
							// onSubmit={handleSubmit} 
							className="form">
			  				<div className="form-group">
								<p className='modal-p'>Название:</p>
								<p className='modal-p'>Цена:</p>
			  				</div>
			  				<div className="form-group">
								{contactError && <p className="error-message">{contactError}</p>}
			  				</div>
			  				<div className="form-group">
			  				<p className='modal-p'>Данные карты:</p>
								<textarea
				  				// value={message}
				  				// onChange={(e) => setMessage(e.target.value)}
				  				placeholder="Номер карты СVV"
				  				required
								></textarea>
			  				</div>
			  				<div className="form-buttons">
								<button type="submit" className="submit-btn">
				  				Купить
								</button>
								<button type="button" onClick={closeModal} className="close-btn">
				  				Закрыть
								</button>
			  				</div>
							</form>
		  				</Modal>
						</div>
						{project.demo_path && (
						<button className='btn' onClick={openModal}>Приобрести</button>
					)}
				</div>
			</div>
		</main>
	);
}

export default Project;