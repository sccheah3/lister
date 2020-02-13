import React, { useState, Fragment } from "react";
import { UncontrolledCollapse, Button } from "reactstrap";

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
        <br/>
            { list.tasks.map(list =>
            <Fragment key={list.id}>
                <li>
                    <Button color="primary" id={"toggler"+list.id} style={{ marginBotton: '1rem' }}>{list.title}</Button>
                    <UncontrolledCollapse toggler={"#toggler"+list.id}>
                        <ListItem list={list}/>
                    </UncontrolledCollapse>
                </li>
                <br/ >
            </Fragment>
            )}
            <li><NewListItemForm parent_url={list.url} resetState={resetState}/></li>
        </ul>
    )
}

export default ListItem;




