const express = require('express');
const app = express();
const addRoutes = require('./route');

addRoutes(app);

app.listen(6001, () => {
    console.log(`HF5 app is running!`);
});