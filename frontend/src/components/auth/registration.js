import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

import "./style.css"


const RegistrationForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate()
  const registerUser = () => {
    const data = {
      "name": '',
      "email": email,
      "isadmin": false,
      "hashed_password": password,
      "about": ""
    }
    setLoading(true)
    axios.post('https://sponq.ru:3332/api/user', data).then(response => {
      setLoading(false)
      const res = response.data
      console.log(res);
      if(res.message){
        navigate('/login')
      }
    })
  }
  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

    // Check if the user has entered both fields correctly
    if (email === '') {
      setEmailError('Введите почту')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Ошибка, введите правильный адрес почты')
      return
    }

    if (password === '') {
      setPasswordError('Введите пароль')
      return
    }

    if (password.length < 8) {
      setPasswordError('Пароль должен быть не меньше 8 символов')
      return
    }

    if (confirmPassword === '') {
      setConfirmPasswordError('Повторите пароль')
      return
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Пароли не совпадают')
      return
    }

    registerUser()
  }

  return (
    <div className={'mainContainer'}>
      <h1 className="title-1">Регистрация</h1>
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="почта"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          value={password}
          placeholder="пароль"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          value={confirmPassword}
          placeholder="повторите пароль"
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{confirmPasswordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'login-btn'} type="button" onClick={onButtonClick} value={'Зарегистрироваться'} />
      </div>
      
      <Link to="/login">
        <button className='btn-login'>
          Уже есть аккаунт?
        </button>
      </Link>
    </div>
  )
}

export default RegistrationForm
