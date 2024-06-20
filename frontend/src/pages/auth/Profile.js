import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const updateUser = () => {
    const data = {
      name: name,
      email: email,
      isadmin: false,
      about: about,
    };
    console.log(data);
    const token = Cookies.get("token");

    let config = {
      headers: {
        authorization: token,
      },
    };
    Cookies.set('name', name)
    Cookies.set('email', email)
    Cookies.set('about', about)
    axios.put("https://sponq.ru:3332/api/user", data, config);
  };
  const onButtonClick = () => {
    Cookies.remove("id");
    Cookies.remove("isadmin");
    Cookies.remove("token");
    window.location.reload();
    navigate("/");
  };
  useEffect(()=>{
    setName(Cookies.get('name'))
    setAbout(Cookies.get('about'))
    setEmail(Cookies.get('email'))
  },[])
  return (
    
    <main className="section">
      <div className="container">
        <ul className="content-list">
          <h2 className="title-1">Профиль</h2>
          <li className="content-list__item">
            <label className="title-2" htmlFor="mail">
              Почта
            </label>
            <input
              type="text"
              id="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </li>
          <li className="content-list__item">
            <label className="title-2" htmlFor="Имя">
              Имя
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </li>
          <li className="content-list__item">
            <p className="title-2">Обо мне:</p>
            <textarea
              placeholder="Введите ваше сообщение"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            ></textarea>
          </li>
          <div onClick={updateUser} className="btn">
            Обновить данные
          </div>
          <button onClick={onButtonClick} className="btn">
            Выйти
          </button>
        </ul>
      </div>
    </main>
  );
};

export default Profile;
