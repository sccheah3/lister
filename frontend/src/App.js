import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
//import Home from "./pages/Home";
import Profile from "./pages/Profile";

import PrivateRoute from "./pages/PrivateRoute";

import { AuthContext } from "./context/auth";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ListHome from "./components/ListHome";

//import Todo from "./components/Todo";


function App(props) {

    const [authTokens, setAuthTokens] = useState(localStorage.getItem('tokens') || '');
    //console.log(localStorage.getItem('tokens'));
//    console.log(authTokens);
    console.log(localStorage);
    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }


  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Lists</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
                <PrivateRoute exact path="/" component={ListHome} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/profile" component={Profile} />
            </div>
        </Router>
    </AuthContext.Provider>
  );
}

export default App;
