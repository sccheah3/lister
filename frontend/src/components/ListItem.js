import React, { Component } from "react";

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
                    <li key={list.title}>{list.title} <ListItem list={list} /></li>
                )}
            </ul>
        )
    }
}

export default ListItem;