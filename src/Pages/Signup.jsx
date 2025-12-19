import "./../Styles/signup.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        localStorage.setItem("userId", result.data._id);
        localStorage.setItem("role", result.data.role);
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup">
      <form className="signupForm" onSubmit={handleSubmit(onSubmit)}>
        <h2>Signup Page</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>Username</label>
        <input type="text" placeholder="Username" {...register("username")} />
        <label>Email</label>
        <input type="email" placeholder="Email" {...register("email")} />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <button className="signupButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
