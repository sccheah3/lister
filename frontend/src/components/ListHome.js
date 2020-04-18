import React, { useEffect, useState, Fragment } from "react";
import { UncontrolledCollapse, Button } from "reactstrap";

import axios from "axios";
import { LIST_API_URL } from "../constants/urls";
import ListItem from "./ListItem";
import NewListItemForm from "./NewListItemForm";

import "./List.css"

const ListHome = (props) => {

    const [lists, setList] = useState([])
    console.log(localStorage)

//JSON.parse(localStorage.getItem('tokens'))['token']
    function getLists() {
        axios.get(LIST_API_URL + "?is_root=true", { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
             .then(res => setList(res.data))
             .catch(err => console.log(err));
    };

    function resetState() {
        getLists();
    };

    function deleteList(url) {
        if (window.confirm("Delete this item?") === false)
            return;

        axios.delete(url, { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
            .then(res => getLists())
            .catch(err => console.log(err));
    }

    function completeTask(list) {
        list["is_complete"] = !list.is_complete
        axios.put(list.url, list, { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
             .then(res => console.log(res))
             .then(() => resetState())
             .catch(err => console.log(err));
    }


    useEffect(() => getLists(), []);


    return (
        <ul>
            <div className="todo-container">
                <li><NewListItemForm resetState={resetState}/></li>
                { lists.map(list =>
                <Fragment key={list.id}>
                    <li>
                        <div className="task">

                            <Button color="danger" onClick={() => deleteList(list.url)}>Delete</Button>
                            <Button color="primary" onClick={() => completeTask(list)}>Complete</Button>
                            <Button color="primary" id={"toggler"+list.id} style={{ marginBottom: '1rem' }}>+/-</Button>
                            <div style={{ textDecoration: list.is_complete ? "line-through" : "", display: "inline-block", color: "red" }}>
                                <p style={{ color: "white" }}>{list.title}</p>
                            </div>
                            <UncontrolledCollapse toggler={"#toggler"+list.id}>
                                <ListItem list={list}/>
                            </UncontrolledCollapse>
                        </div>
                    </li>
                </Fragment>
                )}
            </div>
        </ul>
    );
}

export default ListHome;



