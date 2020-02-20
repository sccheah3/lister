import React, { useState, Fragment } from "react";
import { UncontrolledCollapse, Button } from "reactstrap";

import axios from "axios";
import { LIST_API_URL } from "../constants/urls";
import NewListItemForm from "./NewListItemForm";

import "./List.css"

const ListItem = (props) => {

    const [list, setList] = useState(props.list)

    function getLists() {
        axios.get(LIST_API_URL + list.id + "/", { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
             .then(res => setList(res.data ))
             .catch(err => console.log(err));
    };

    function resetState() {
        getLists();
    }


    return (
        <ul>
            <div className="todo-container-nested">
                <li><NewListItemForm parent_url={list.url} resetState={resetState}/></li>
                { list.tasks.map(list =>
                <Fragment key={list.id}>
                    <li>
                        <div className="task">
                            {list.title}
                            <Button color="primary" id={"toggler"+list.id} style={{ marginBotton: '1rem' }}>Expand</Button>
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




