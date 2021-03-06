import React, { useEffect, useState, Fragment } from "react";
import { UncontrolledCollapse, Button } from "reactstrap";

import ListItem from "./ListItem";
import NewListItemForm from "./NewListItemForm";

import { getLists, deleteList, completeTask } from "./api";
import "./List.css";

const ListHome = (props) => {

    const [lists, setList] = useState([]);

    useEffect(() => getLists(setList, "?is_root=true"), []);

    return (
        <ul>
            <div className="todo-container">
                <li><NewListItemForm setList={setList} query="?is_root=true"/></li>
                { lists.map(list =>
                <Fragment key={list.id}>
                    <li>
                        <div className="task">
                            <Button color="danger" onClick={() => deleteList(setList, list.url, "?is_root=true")}>Delete</Button>
                            <Button color="primary" onClick={() => completeTask(list, setList, "?is_root=true")}>Complete</Button>
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



