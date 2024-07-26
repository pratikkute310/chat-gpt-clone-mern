import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", { name, email, password }); // Log form data
    try {
      const { data: res } = await axios.post("http://localhost:5000/api/users/", { name, email, password });
      console.log("Server response:", res); // Log server response
      navigate("/login");
    } catch (error) {
      console.error("Error occurred:", error); // Log full error
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <p>Already have account??</p>
          <Link to="/login">Login</Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create account</h1>
            <input
              type="text"
              placeholder="User Name"
              name="name"
              onChange={handleChange}
              value={name}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
