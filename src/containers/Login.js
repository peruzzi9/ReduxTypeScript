import { useState } from "react";
import {  useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logInStart } from "../store/Auth/authAction";
// MaterialUi
import Button from "@material-ui/core/Button";

const LogIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // for call redux action signin
  const dispatch = useDispatch();
  // for Auth status
  const auth = useSelector((state) => state.auth);

  //for go back to latest visited link after successfull login
  let history = useHistory();

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInStart(credentials));
  };

  if (history.location.state)
    console.log(
      `%chistory come from ====${history.location.state.from.pathname}`,
      "color:#fff;background:#08c;padding:5px;border-radius:8px"
    );

  //for go back to latest visited link after successfull login
  if (auth.currentUser)
    if (history.location.state) {
      console.log(
        `%chistory goBack====${history.location.state.from.pathname}`,
        "color:#fff;background:#08c;padding:5px;border-radius:8px"
      );
      history.push(history.location.state.from.pathname);
    } else history.push("/");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <div>
          <label>
            Email
            <input
              name="email"
              type="text"
              value={credentials.email}
              onChange={handleChange}
              required
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
              pattern=".{5,20}"
              required
            />
          </label>
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
        <Button variant="contained" href="/register">
          Register New User
        </Button>
      </form>

      <div>
        <h1>{auth.error}</h1>
      </div>
    </div>
  );
};

export default LogIn;
