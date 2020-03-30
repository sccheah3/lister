import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../img/lister_icon.png";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();


  const referer = (props.location.state ? props.location.state.referer.pathname : '/');


  function postLogin() {
    //alert(userName);
    //alert(password);
    axios.post("http://127.0.0.1:8000/accounts/auth/login/", {
      "username": userName,
      "password": password
    }).then(result => {
        //alert("REACH HERE")
      if (result.status === 200) {
        //alert("result.status == 200")
        //console.log(JSON.stringify(result.data));
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  function enterPressed(event) {
    var code = event.keycode || event.which;
    if (code === 13) {
        postLogin();
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
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
        { isError &&<Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Login;