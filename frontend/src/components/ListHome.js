import React, { useEffect, useState, Fragment } from "react";
import { UncontrolledCollapse, Button } from "reactstrap";

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
            <Fragment key={list.id}>
                <li>
                    <Button color="primary" id={"toggler"+list.id} style={{ marginBottom: '1rem' }}>{list.title}</Button>
                    <UncontrolledCollapse toggler={"#toggler"+list.id}>
                        <ListItem list={list}/>
                    </UncontrolledCollapse>
                </li>
                <br />
            </Fragment>
            )}
            <li><NewListItemForm resetState={resetState}/></li>
        </ul>
    );
}

export default ListHome;



