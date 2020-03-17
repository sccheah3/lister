import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../img/django_unchained_pony.jpg";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAuthTokens } = useAuth();

  function postSignup() {
    axios.post("http://127.0.0.1:8000/accounts/auth/register/", {
      "username": userName,
      "password": password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  function handleSubmit() {
    if (password !== confirmPassword) {
        alert("Passwords don't match");
    }
    else {
        postSignup();
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  function enterPressed(event) {
    var code = event.keycode || event.which;
    if (code === 13) {
        postSignup();
    }
  }


  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          onKeyPress={enterPressed}
          placeholder="username"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          onKeyPress={enterPressed}
          placeholder="password"
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value);
          }}
          onKeyPress={enterPressed}
          placeholder="confirm password"
        />
        <Button onClick={handleSubmit}>Create Account</Button>
      </Form>
      <Link to="/login">Have an account? Sign in!</Link>
        { isError &&<Error>Error! Good luck!</Error> }
    </Card>
  );
}

export default Login;