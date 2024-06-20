import Cookies from 'js-cookie';
import React, { useState } from 'react';

import { useNavigate, Link} from 'react-router-dom'


const Profile = () => {
  const navigate = useNavigate()
    const onButtonClick = () => {
        Cookies.remove('id')
        Cookies.remove('isadmin')
        Cookies.remove('token')
        window.location.reload()
        navigate('/')
    }
	return (
        			<main className="section">
                       <div className="container">
                           <ul className="content-list">
                           <h2 className="title-1">Профиль</h2>
                               <li className="content-list__item">
                                <label className="title-2" htmlFor="mail">Почта</label>
                                    <input
                                     type="text"
                                     id="mail"
                                     //value={""}
                                     //onChange={(e) => setName(e.target.value)}
                                     required
                                    />
                                </li>
                                <li className="content-list__item">
                               <label className="title-2" htmlFor="Имя">Имя</label>
                                    <input
                                     type="text"
                                     id="name"
                                     //value={""}
                                     //onChange={(e) => setName(e.target.value)}
                                     required
                                    />
                                    </li>
                                    <li className="content-list__item">
                                    <p className='title-2'>Обо мне:</p>
			                            <textarea
			                              placeholder="Введите ваше сообщение"
			                              required
			                            ></textarea>
                                         </li>
                                    <li className="content-list__item">
                                    <label className="title-2" htmlFor="name">Роль</label>
                                    <p></p>
                                    </li> 
                                    <li className="content-list__item">
                                    <label className="title-2" htmlFor="name">Зарегистрирован</label>
                                    <p></p>
                                    </li>
                                    <button onClick={onButtonClick}  className='btn'>Выйти</button>     
                           </ul>
                       </div>
                   </main>
	);
};

export default Profile;
