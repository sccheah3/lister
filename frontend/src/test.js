axios = require('../node_modules/axios');
const LIST_API_URL = "http://127.0.0.1:8000/api/lists/";

l = [];

axios.get(LIST_API_URL).then(res => (l = res.data));

console.log(l);