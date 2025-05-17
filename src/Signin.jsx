import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './store';

function SignIn() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    navigate("/Home");
  };

  // Enhanced Inline Styles
  const containerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #f8f9fa)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    padding: '35px 30px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    animation: 'fadeIn 0.5s ease-in-out'
  };

  const inputStyle = {
    padding: '12px',
    fontSize: '15px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    transition: 'border 0.2s',
    outline: 'none'
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'background 0.3s'
  };

  const linkStyle = {
    textAlign: 'center',
    fontSize: '14px',
    color: '#6c757d',
    marginTop: '10px'
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <h2 style={{ textAlign: 'center', color: '#343a40' }}>User Sign In</h2>
        
        <input
          type="text"
          placeholder="Username"
          {...register('username', { required: true })}
          style={inputStyle}
          onFocus={(e) => e.target.style.border = '1px solid #007bff'}
          onBlur={(e) => e.target.style.border = '1px solid #ced4da'}
        />

        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
          style={inputStyle}
          onFocus={(e) => e.target.style.border = '1px solid #007bff'}
          onBlur={(e) => e.target.style.border = '1px solid #ced4da'}
        />

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Sign In
        </button>

        <p style={linkStyle}>
          New user? <a href="/SignUp" style={{ color: '#007bff', textDecoration: 'none' }}>Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
