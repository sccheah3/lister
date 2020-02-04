import React, { Component } from "react";

import axios from "axios";
import { LIST_API_URL } from "../constants/urls";


class ListHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
        }
    }

    componentDidMount() {
        this.resetState();
    }

    getLists = () => {
        axios.get(LIST_API_URL).then(res => this.setState({ lists: res.data }));
    };

    resetState = () => {
        this.getLists();
    };


    render() {
        return (
            <ul>
                { this.state.lists.map(list => <li>{ list.url }</li>)}
            </ul>
        )
    }
}

export default ListHome;