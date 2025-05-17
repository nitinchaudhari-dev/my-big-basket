import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from './store';

function SignUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    alert("Registration Successful");
    navigate("/SignIn");
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "60px auto",
      padding: "30px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: "25px",
        color: "#333"
      }}>User Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: true })}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* Gender */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: "bold",
            color: "#444"
          }}>Gender</label>
          <div style={{ display: "flex", gap: "15px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="radio"
                value="m"
                {...register('gender', { required: true })}
              />
              Male
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="radio"
                value="f"
                {...register('gender', { required: true })}
              />
              Female
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background 0.3s ease"
        }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
