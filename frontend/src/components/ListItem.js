import React, { Component } from "react";

import axios from "axios";
import { LIST_API_URL } from "../constants/urls";

import NewListItemForm from "./NewListItemForm";


class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
        }

        this.resetState = this.resetState.bind(this);
    }

    getLists = () => {
        axios.get(LIST_API_URL + this.state.list.id + "/").then(res => this.setState({ list: res.data }));
        console.log(this.state.list)
    };

    resetState = () => {
        this.getLists();
    };

    render() {
        return (
            <ul>
                { this.state.list.tasks.map(list =>
                    <li key={list.title}>{list.title} <ListItem list={list} resetState={this.resetState}/></li>
                )}
                <li><NewListItemForm parent_url={this.state.list.url} resetState={this.resetState}/></li>
            </ul>
        )
    }
}

export default ListItem;