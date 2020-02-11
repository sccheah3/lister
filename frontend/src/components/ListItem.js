import React, { useState } from "react";

import axios from "axios";
import { LIST_API_URL } from "../constants/urls";
import NewListItemForm from "./NewListItemForm";

import "./List.css"

const ListItem = (props) => {

    const [list, setList] = useState(props.list)

    function getLists() {
        axios.get(LIST_API_URL + list.id + "/")
             .then(res => setList(res.data ))
             .catch(err => console.log(err));
    };

    function resetState() {
        getLists();
    }


    return (
        <ul>
            { list.tasks.map(list =>
                <li key={list.id}>{list.title}<ListItem list={list}/></li>
            )}
            <li><NewListItemForm parent_url={list.url} resetState={resetState}/></li>
        </ul>
    )
}

export default ListItem;




