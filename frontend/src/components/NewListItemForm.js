import React, { Component } from "react";

import axios from "axios";

import { LIST_API_URL } from "../constants/urls";
import "./List.css";


class NewListItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parent_list: this.props.parent_url,
            title: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postList = this.postList.bind(this);
    }

    postList = () => {
        axios.post(LIST_API_URL, this.state, { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
             .then(res => console.log(res))
             .then(() => this.props.resetState())
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
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className="create-task">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <input type="hidden" autoComplete="off" />
                <input type="text" className="input" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Add a new task"/>
            </form>
            </div>
        )
    }
}

export default NewListItemForm;