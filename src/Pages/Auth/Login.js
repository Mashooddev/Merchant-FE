import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GLOBALS from '../../config';
import { Alert } from '@mui/material';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user_token") != null) navigate("/admin-dashboard");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = GLOBALS.BASE_URL + 'admin/login';
    console.log(url);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    const postData = {
      email: email,
      password: password,
    };
    axios
      .post(url, postData, config)
      .then((response) => {
        if (response.data.error == true) {
          setErrorMsg(response.data.msg + '!');
        } else {
          console.log(response);
          setErrorMsg("");
          localStorage.setItem("user_token", response.data.token);
          localStorage.setItem("user_email", response.data.email);
          localStorage.setItem("user_name", response.data.name);
          localStorage.setItem("user_type", 'admin');
          navigate("/admin-dashboard");
        }
      })
      .catch((error) => {
        console.log("axios error: ", error);
        setErrorMsg("Network Error!");
      });
  };

  const style = {
    borderBottom: "1px dashed white",
  };

  return (
    <>
      <div class="main-w3layouts wrapper">
        <h1>Login</h1>
        <div class="main-agileinfo">
          <div class="agileits-top">
            {errorMsg != "" && <Alert severity="error">{errorMsg}</Alert>}
            <form onSubmit={handleSubmit}>
              <input
                className="text"
                style={style}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="text"
                style={style}
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                min={6}
                required
              />
              <input type="submit" value="Login" />
            </form>
            <p>
              Don't have an Account? <a href="/sign-up"> Sign-Up Now!</a>
            </p>
          </div>
        </div>
        <ul class="colorlib-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}

export default Login;