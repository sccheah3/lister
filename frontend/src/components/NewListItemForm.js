import React, { Component } from "react";

import axios from "axios";

import { LIST_API_URL } from "../constants/urls";


class NewListItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parent_list: this.props.parent_url,
            title: '',
            detail: '',
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
            detail: '',
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title"/><br/>
                <textarea name="detail" rows="3" cols="33" value={this.state.detail} onChange={this.handleChange} placeholder="Detail"></textarea><br/>
                <input type="submit" value="add"/>
            </form>
        )
    }
}

export default NewListItemForm;