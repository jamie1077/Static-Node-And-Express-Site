//Nodes 'require' function to include modules
const express = require('express');

//Creates express application
const app = express();

//Mounts the middleware
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('public'));

//Lets express know to use pug templates in the views folder
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.send('hello world');
  });

//Listens for connections on the specified host and port
app.listen(3000, () => {
    console.log('The application is running on localhost: 3000!');
});