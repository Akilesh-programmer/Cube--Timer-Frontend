import "./../Styles/login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "success") {
        localStorage.setItem("userId", result.data.user._id);
        localStorage.setItem("role", result.data.user.role);
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Page</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>Email</label>
        <input type="email" placeholder="Email" {...register("email")} />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <button className="loginButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
