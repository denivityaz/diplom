import { NavLink } from 'react-router-dom';
import BtnDarkMode from '../btnDarkMode/BtnDarkMode';
import React, { useState, useEffect } from 'react';
import './style.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const Navbar = () => {
	const activeLink = 'nav-list__link nav-list__link--active';
	const normalLink = 'nav-list__link';
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
	useEffect(() => {
        const fetchUser = async () => {
            try {
				const token = Cookies.get('token')
				if(!token) {
					setLoading(false)
					return
				}
				const id = Cookies.get('id')
				let config = {
					headers: {
						authorization: token, 
					}
				}
                const response = await axios.get('https://sponq.ru:3332/api/user/'+id, config);
				console.log(response);
                setUser(response.data); 
                setLoading(false); 
            } catch (err) {
                setError(err.message); 
                setLoading(false); 
            }
        };

        fetchUser();
    }, []); 
	if (loading) return <div>Загрузка...</div>; 
    if (error) return <div>Ошибка: {error}</div>; 
	return (
		<nav className="nav">
			<div className="container">
				<div className="nav-row">
					<NavLink to="/" className="logo">
						Елена <strong>Ракова</strong>
					</NavLink>

					<BtnDarkMode />

					<ul className="nav-list">
						<li className="nav-list__item">
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? activeLink : normalLink
								}
							>
								Главная
							</NavLink>
						</li>

						<li className="nav-list__item">
							<NavLink
								to="/projects"
								className={({ isActive }) =>
									isActive ? activeLink : normalLink
								}
							>
								Курсы
							</NavLink>
						</li>
						<li className="nav-list__item">
							<NavLink
								to="/contacts"
								className={({ isActive }) =>
									isActive ? activeLink : normalLink
								}
							>
								Контакты
							</NavLink>
						</li>
						<li className="nav-list__item">
							<NavLink
								to="/login"
								className={({ isActive }) =>
									isActive ? activeLink : normalLink
								}
							>
								Аккаунт
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
