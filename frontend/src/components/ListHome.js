import React, { Component } from "react";

import axios from "axios";
import { LIST_API_URL } from "../constants/urls";
import ListItem from "./ListItem";


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
        axios.get(LIST_API_URL + "?is_root=true").then(res => this.setState({ lists: res.data }));
    };

    resetState = () => {
        this.getLists();
    };


    render() {
        console.log(this.state.lists)
        return (
            <ul>
                { this.state.lists.map(list =>
                    <li key={list.title}>{list.title} <ListItem list={list} /></li>
                )}
            </ul>
        )
    }
}

export default ListHome;