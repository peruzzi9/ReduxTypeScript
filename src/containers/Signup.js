import { useState } from "react";
import {  useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerStart } from "../store/Auth/authAction";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });

  const dispatch = useDispatch();
  // for Auth status
  const auth = useSelector((state) => state.auth);

  console.log("Register  =======",auth)
  //for go back to latest visited link after successfull login
  let history = useHistory();

  // move to home page if user is already logged in or after successful registration
  if (auth.currentUser) history.push("/");

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerStart(credentials));
  };

  return (
    <div> 
      <form onSubmit={handleSubmit}>
        <h2>REGISTER</h2>
        <div>
          <label>
            Full Name
            <input
              name="username"
              type="text"
              value={credentials.username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email
            <input
              name="email"
              type="text"
              value={credentials.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <button type="submit">Register & Log In</button>
        </div>
      </form>
      {<div>
        <h1>{auth.error}</h1>
      </div>}
    </div>
  );
};

export default Register;
