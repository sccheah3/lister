import React, { useEffect, useState, Fragment } from "react";
import { UncontrolledCollapse, Button } from "reactstrap";

import axios from "axios";
import { LIST_API_URL } from "../constants/urls";
import ListItem from "./ListItem";
import NewListItemForm from "./NewListItemForm";

import "./List.css"

const ListHome = (props) => {

    const [lists, setList] = useState([])

//JSON.parse(localStorage.getItem('tokens'))['token']
    function getLists() {
        axios.get(LIST_API_URL + "?is_root=true", { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
             .then(res => setList(res.data))
             .catch(err => console.log(err));
    };

    function resetState() {
        getLists();
    };

    useEffect(() => getLists(), []);


    return (
        <ul>
            <div className="todo-container">
                <li><NewListItemForm resetState={resetState}/></li>
                { lists.map(list =>
                <Fragment key={list.id}>
                    <li>
                        <div className="task">
                            {list.title}
                            <Button color="primary" id={"toggler"+list.id} style={{ marginBottom: '1rem' }}>Expand</Button>
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



