import React, { Component } from "react";

import { postList } from "./api";
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
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.state);
        postList(this.state, this.props.setList, this.props.query);
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