import React, { useState, Fragment } from "react";
import { UncontrolledCollapse, Button } from "reactstrap";

import NewListItemForm from "./NewListItemForm";
import { getLists, deleteList, completeTask } from "./api";

import "./List.css"

const ListItem = (props) => {

    const [list, setList] = useState(props.list)

    function resetState() {
        getLists(list, setList);
    }

    return (
        <ul>
            <div className="todo-container-nested">
                <li><NewListItemForm parent_url={list.url} resetState={resetState}/></li>
                { list.tasks.map(list =>
                <Fragment key={list.id}>
                    <li>
                        <div className="task">
                            <Button color="danger" onClick={() => deleteList(list.url, setList)}>Delete</Button>
                            <Button color="primary" onClick={() => completeTask(list, setList)}>Complete</Button>
                            <Button color="primary" id={"toggler"+list.id} style={{ marginBotton: '1rem' }}>+/-</Button>
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
    )
}

export default ListItem;




