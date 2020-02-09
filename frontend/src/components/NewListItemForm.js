import React, { Component } from "react";

import axios from "axios";

import { LIST_API_URL } from "../constants/urls";


class NewListItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parent: '',
            title: '',
            detail: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postList = this.postList.bind(this);
    }

    postList = () => {
        axios.post(LIST_API_URL, this.state)
             .then(res => console.log(res))
             .catch(err => console.log(err));
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        this.postList();
        this.setState({
            parent: '',
            title: '',
            detail: '',
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title"/><br/>
                <input type="text" name="detail" value={this.state.detail} onChange={this.handleChange} placeholder="Detail"/><br/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

export default NewListItemForm;