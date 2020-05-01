import axios from "axios";
import { LIST_API_URL } from "../constants/urls"


function getToken() {
	try {
		var token = JSON.parse(localStorage.getItem('tokens'))['token'];
	}
	catch(err) {
		console.log(err);
		localStorage.clear();
	
		return null;
	}

	if (token === undefined) {
		localStorage.clear();
	}

	return token;
}


// GET request
// @setList - react hook function to update lists
// @query - can specify list id or filtering/searching
export function getLists(setList, query) {
	var token = getToken();

	if (token === undefined) {
		localStorage.clear();
		return;
	}    

	axios.get(LIST_API_URL + query, { headers: { 'Authorization': `Token ${token}` }})
         .then(res => setList(res.data ))
         .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                localStorage.clear();
            }
         });
};

// DELETE request
// @setList - react hook function to update lists
// @url - complete url of the list you want to delete
// @query - specify what lists to get from getLists()
export function deleteList(setList, url, query) {
    var token = getToken();

    if (token === undefined) { 
        localStorage.clear();
        return;
    }

	if (window.confirm("Delete this item?") === false)
        return;

    axios.delete(url, { headers: { 'Authorization': `Token ${token}` }})
         .then(res => getLists(setList, query))
         .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                localStorage.clear();
            }
         });
};

// PUT request
// @list - list object to mark as complete
// @setList - react hook function to update lists
// @query - specify what lists to get from getLists()
export function completeTask(list, setList, query) {
	var token = getToken();

    if (token === undefined) { 
        localStorage.clear();
        return;
    }    


	list["is_complete"] = !list.is_complete;
    axios.put(list.url, list, { headers: { 'Authorization': `Token ${token}` }})
         .then(res => console.log(res))
         .then(() => getLists(setList, query))
         .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                localStorage.clear();
            }
         });
};

// POST request
// @list - list object to create
// @setList - react hook function to update lists
// @query - specify what lists to get from getLists()
export function postList(list, setList, query) {
	var token = getToken();

	if (token === undefined) {
		localStorage.clear();
		return;
	}

    axios.post(LIST_API_URL, list, { headers: { 'Authorization': `Token ${token}` }})
         .then(res => console.log(res))
         .then(() => getLists(setList, query))
         .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                localStorage.clear();
            }
         });
}


