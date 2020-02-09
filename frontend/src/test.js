axios = require('../node_modules/axios');
const LIST_API_URL = "http://127.0.0.1:8000/api/lists/";

l = [];

axios.get(LIST_API_URL).then(res => (console.log(res.data)));

axios.post(LIST_API_URL, {title:'title1'}).then(res => console.log(res.status))
axios.get(LIST_API_URL).then(res => (console.log(res.data)));
