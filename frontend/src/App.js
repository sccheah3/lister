import React, { Component } from "react";

import Header from "./components/Header";
import ListHome from "./components/ListHome";


class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <ListHome />
            </div>
        );
    }
}


export default App;