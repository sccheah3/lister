import React, { Component } from "react";

import NewListItemForm from "./NewListItemForm";


class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
        }
    }

    render() {
        return (
            <ul>
                { this.state.list.tasks.map(list =>
                    <li key={list.title}>{list.title} <ListItem list={list} resetState={this.props.resetState}/></li>
                )}
                <li><NewListItemForm parent_url={this.state.list.url} resetState={this.props.resetState}/></li>
            </ul>
        )
    }
}

export default ListItem;