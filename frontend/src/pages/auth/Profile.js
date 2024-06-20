import React, { useState } from 'react';


// const Profile = ({ user }) => {
//     const [name, setName] = useState(user.name);
//     const [email, setEmail] = useState(user.email);
//     const [registrationAt] = useState(user.registration_at);
//     const [about, setAbout] = useState(user.about || '');

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Add your form submission logic here
//         console.log({
//             name,
//             email,
//             registrationAt,
//             about
//         });
//     };


const Profile = () => {
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
                                    <button className='btn'>Изменить</button><button className='btn'>Выйти</button> 
                                    </li>
                           </ul>
                       </div>
                   </main>
	);
};

export default Profile;
