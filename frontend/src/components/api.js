import axios from "axios";
import { LIST_API_URL } from "../constants/urls"

export function getLists(setList, query) {
    console.log(LIST_API_URL + query);
    axios.get(LIST_API_URL + query, { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
         .then(res => setList(res.data ))
         .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                localStorage.clear();
            }
         });
};

export function deleteList(setList, url, query) {
    if (window.confirm("Delete this item?") === false)
        return;

    axios.delete(url, { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
         .then(res => getLists(setList, query))
         .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                localStorage.clear();
            }
         });
};


export function completeTask(list, setList, query) {
    list["is_complete"] = !list.is_complete;
    axios.put(list.url, list, { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
         .then(res => console.log(res))
         .then(() => getLists(setList, query))
         .catch(err => {
                if (err.response.status === 401) {
                    localStorage.clear();
                }
                console.log(err);
         });
};


