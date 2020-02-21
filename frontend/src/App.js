import React, { useState } from 'react';

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
//import Home from "./pages/Home";
import Admin from "./pages/Admin";

import PrivateRoute from "./pages/PrivateRoute";

import { AuthContext } from "./context/auth";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ListHome from "./components/ListHome";

//import Todo from "./components/Todo";


function App(props) {

    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') || '');

//    console.log(authTokens);
//    console.log(localStorage);
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
                        <Link to="/admin">Admin Page</Link>
                    </li>
                </ul>
                <PrivateRoute exact path="/" component={ListHome} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/admin" component={Admin} />
            </div>
        </Router>
    </AuthContext.Provider>
  );
}

export default App;
