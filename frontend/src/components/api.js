import axios from "axios";
import { LIST_API_URL } from "../constants/urls"


export function getLists(list, setList) {
    axios.get(LIST_API_URL + list.id + "/", { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
         .then(res => setList(res.data ))
         .catch(err => console.log(err));
};

export function deleteList(url, setList) {
    if (window.confirm("Delete this item?") === false)
            return;

    axios.delete(url, { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
         .then(res => getLists(setList))
         .catch(err => console.log(err));
};


export function completeTask(list, setList) {
    list["is_complete"] = !list.is_complete
    axios.put(list.url, list, { headers: { 'Authorization': `Token ${JSON.parse(localStorage.getItem('tokens'))['token']}` }})
         .then(res => console.log(res))
         .then(() => getLists(setList))
         .catch(err => console.log(err));
};


