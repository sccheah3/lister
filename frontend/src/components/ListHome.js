import React, { useEffect, useState } from "react";

import axios from "axios";
import { LIST_API_URL } from "../constants/urls";
import ListItem from "./ListItem";
import NewListItemForm from "./NewListItemForm";

import "./List.css"

const ListHome = (props) => {

    const [lists, setList] = useState([])

    function getLists() {
        axios.get(LIST_API_URL + "?is_root=true")
             .then(res => setList(res.data))
             .catch(err => console.log(err));
    };

    function resetState() {
        getLists();
    };

    useEffect(() => getLists(), []);


    return (
        <ul>
            { lists.map(list =>
                <li key={list.id}>{list.title}<ListItem list={list}/></li>
            )}
            <li><NewListItemForm resetState={resetState}/></li>
        </ul>
    );
}

export default ListHome;



