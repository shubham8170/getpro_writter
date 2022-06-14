const { Router } = require('express');
const express = require('express');
const app = express();
const port=process.env.PORT || 8080;
require('./db/db')
const postrouter = require('./router/post')
const get_router = require('./router/get')
app.use(express.json());
app.use(postrouter);
app.use(get_router)

app.listen(port, () => {
    console.log(`app listning at port ${port}`);
})