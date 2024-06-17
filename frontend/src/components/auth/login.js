// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginForm = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8000/login', {
//                 username,
//                 password
//             });
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <form onSubmit={handleLogin}>
//             <div>
//                 <label>Username:</label>
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <h2 className="Title-2">Password:</h2>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>
//             <button type="submit" className="btn">Login</button>
//         </form>
//     );
// };

// export default LoginForm;

import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'

import "./style.css"

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Введите почту')
      return
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Ошибка, введите правильный адрес почты')
      return
    }
  
    if ('' === password) {
      setPasswordError('Введите пароль')
      return
    }
  
    if (password.length < 7) {
      setPasswordError('Пароль должен быть не меньше 8 символов')
      return
    }
  
    // Authentication calls will be made here...
  }

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