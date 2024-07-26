import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const [userData, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("shshshshshshs "+userData)
      const url = "http://localhost:5000/api/users/auth";
      console.log(userData)
      const res = await axios.post(url, userData);
      console.log(res);
      
      localStorage.setItem("token", res.data.token);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={userData.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={userData.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Welcome Back</h1>
          <p>New here?</p>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};



export default Login;
