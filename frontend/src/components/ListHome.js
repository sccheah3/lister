import React, { Component } from "react";

import axios from "axios";
import { LIST_API_URL } from "../constants/urls";
import ListItem from "./ListItem";
import NewListItemForm from "./NewListItemForm";


class ListHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
        }

        this.resetState = this.resetState.bind(this);
        this.getLists = this.getLists.bind(this);
    }

    componentDidMount() {
        this.resetState();
    }

    getLists = () => {
        axios.get(LIST_API_URL + "?is_root=true").then(res => this.setState({ lists: res.data }));
        //console.log(this.state.lists)
    };

    resetState = () => {
        this.getLists();
    };


    render() {
        console.log("here")
        return (
            <ul>
                { this.state.lists.map(list =>
                    <li key={list.title}>{list.title} <ListItem list={list} resetState={this.resetState}/></li>
                )}
                <li><NewListItemForm resetState={this.resetState}/></li>
            </ul>
        )
    }
}

export default ListHome;