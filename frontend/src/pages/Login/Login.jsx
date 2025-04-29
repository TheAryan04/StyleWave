import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { ShopContext } from '../../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken, navigate} = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async(e)=> {
    e.preventDefault();

    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/v2/user/register', {name, email, password});
        if(response.data.success){
          setToken(response.data.message);
          toast.success(response.data.message);
          localStorage.setItem('token', response.data.token)
        }else{
          toast.error(response.data.message);
        }
      }
      else{
        const response = await axios.post(backendUrl + '/api/v2/user/login', {email, password});
        if(response.data.success){
          setToken(response.data.message);
          toast.success(response.data.message);
          localStorage.setItem('token', response.data.token)
        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    if(token){
      navigate('/');
    }
  })
  return (
    <div>
      <form onSubmit={onSubmitHandler} className="auth-form">
        <div className="form-header">
          <p className="form-title">{currentState}</p>
        </div>
        {
          currentState === 'Login' ? null : (
            <input onChange={(e)=> setName(e.target.value)} value={name} type="text" className='form-input' placeholder='Name' required />
          )
        }
        <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" className='form-input' placeholder='Email' required />
        <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className='form-input' placeholder='Password' required />
        <div className="form_footer">
          <p className="forgot-pswd">Forgot password</p>
          {
            currentState === 'Login' ? (
              <p className='toggle-auth-state' onClick={()=> setCurrentState('Sign Up')}>Create account</p>
            ) : (
              <p className='toggle-auth-state' onClick={()=> setCurrentState('Login')}>Already have an account? Login</p>
            )
          }
        </div>
        <button className="form-bottom">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login;