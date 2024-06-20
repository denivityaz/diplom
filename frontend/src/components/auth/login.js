import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

import "./style.css"

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate()
  const loginUser = () => {
    const data =     {
      "email": email,
      "password": password
  }
    setLoading(true)
    axios.post('https://sponq.ru:3332/api/login', data).then(response => {
      setLoading(false)
      const res = response.data
      console.log(res);
      if(res.error){
        const err = res.error
        if(err === 'Не верный пароль') setPasswordError(err)
        if(err === 'Не верный email') setEmailError(err)
      }else{
        const {token} = res
        const {email, isadmin, id} = res.user
        Cookies.set('token', token, {expires: 7})
        Cookies.set('id', id, {expires: 7})
        Cookies.set('isadmin', isadmin, {expires: 7})
        navigate("/");
        window.location.reload()
      }
    })
  }
  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Введите почту')
      return
    }
  
    // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{1,1}$/.test(email)) {
    //   setEmailError('Ошибка, введите правильный адрес почты')
    //   return
    // }
  
    if ('' === password) {
      setPasswordError('Введите пароль')
      return
    }
  
    if (password.length < 1) {
      setPasswordError('Пароль должен быть не меньше 8 символов')
      return
    }
  
    loginUser()
  }
  if (loading) return <div>Загрузка...</div>; 
  return (
    <div className={'mainContainer'}>
        <h1 className="title-1">Вход</h1>
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
          value={password}
          placeholder="пароль"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'login-btn'} type="button" onClick={onButtonClick} value={'Войти'} />
      </div>
        
        <Link to="/register">
            <button className='btn-login'>
                Нет аккаунта?
            </button>
        </Link>
      </div>
  )
}

export default Login