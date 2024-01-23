const express = require('express');
const { request } = require('http');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

app.get('/', (request,response) => {
    // response.send(`<h1> Hello World </h1>`);
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* Now using this method if we have miltiple files in public folder so we need to create multiple route for those file
like for about.html we create /about for contact.html we create /contact

But if we set a public folder to static folder then we not need to make a multiple route for multiple files
we can access those file using directly fileName.html */

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
/* So now the public folder is a static folder
so we can access all the public folder files directly with fileName.html 
like : index.html, about.html 
use() method is use when we want to include a middleware
*/

// Init middleware
// app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded( {extended:false}));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = 5000;

app.listen(PORT, () => {
    console.log("The server is started");
});