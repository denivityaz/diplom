import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import './style.css';
import Cookies from 'js-cookie';
import axios from 'axios';

Modal.setAppElement('#root');

const Header = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalAnimationClass, setModalAnimationClass] = useState('');
	const [name, setName] = useState('');
	const [contactMethod, setContactMethod] = useState('');
	const [message, setMessage] = useState('');
	const [contactError, setContactError] = useState('');
	const [isSubmit, setIsSubmit] = useState(false);
  
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
  
	const validateContactMethod = (contact) => {
	  const phonePattern = /^\+?[0-9\s\-]{7,15}$/;
	  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	  return phonePattern.test(contact) || emailPattern.test(contact);
	};
  
	const handleSubmit = (e) => {
	  e.preventDefault();
	  if (!validateContactMethod(contactMethod)) {
		setContactError('Пожалуйста, введите корректный номер телефона или email.');
		return;
	  }
  
	  // Здесь можно обработать данные формы, например, отправить их на сервер
	  console.log('Имя:', name);
	  console.log('Способ связи:', contactMethod);
	  console.log('Сообщение:', message);
	  closeModal();

	};
	const push = () => {
		const id = Cookies.get('id')
		const token = Cookies.get('token')
		const data = {
			"name": name,
			"user_id": id,
			"connect_way": contactMethod,
			"message": message
		}
		let config = {
			headers: {
				authorization: token, 
			}
		}
		axios.post('https://sponq.ru:3332/api/appointment',data, config).then(res => {
			console.log(res);
			setIsSubmit(true)
		})
	  }
	return (
	  <header className="header">
		<div className="header__wrapper">
		  <h1 className="header__title">
			<strong>
			  Привет, я <em>Елена</em>
			</strong>
			<br />психотерапевт
		  </h1>
		  <div className="header__text">
			<p>с большим опытом и знаниями.</p>
		  </div>
		  <Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			className={`modal ${modalAnimationClass}`}
			overlayClassName="overlay"
			contentLabel="Форма записи"
			closeTimeoutMS={300}
		  >
			{!isSubmit && 
			<h2 className="title-2">Записаться к психотерапевту</h2>
			}
			{isSubmit && 
			<h2 className="title-2">Спасибо. Мы свяжемся с вами</h2>
			}
			{!isSubmit && 
			<form onSubmit={handleSubmit} className="form">
			  <div className="form-group">
				<p className='modal-p'>Имя:</p>
				<input
				  type="text"
				  value={name}
				  onChange={(e) => setName(e.target.value)}
				  placeholder="Введите ваше имя"
				  required
				/>
			  </div>
			  <div className="form-group">
			  <p className='modal-p'>Ваши контакты:</p>
				<input
				  type="text"
				  value={contactMethod}
				  onChange={(e) => {
					setContactMethod(e.target.value);
					setContactError('');
				  }}
				  placeholder="Введите ваш номер телефона или email"
				  required
				/>
				{contactError && <p className="error-message">{contactError}</p>}
			  </div>
			  <div className="form-group">
			  <p className='modal-p'>Сообщение:</p>
				<textarea
				  value={message}
				  onChange={(e) => setMessage(e.target.value)}
				  placeholder="Введите ваше сообщение"
				  required
				></textarea>
			  </div>
			  <div className="form-buttons">
				<div onClick={push} type="submit" className="submit-btn">
				  Отправить
				</div>
				<button type="button" onClick={closeModal} className="close-btn">
				  Закрыть
				</button>
			  </div>
			</form>
			}
		  </Modal>
		  <button className="btn" onClick={openModal}>Попасть ко мне</button>
		</div>
	  </header>
	);
  };
  
  export default Header;