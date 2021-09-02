//Nodes 'require' function to include modules
const express = require('express');
const {projects} = require('./data.json');

//Creates express application
const app = express();

//Mounts the middleware
app.use(express.json());
app.use('/static', express.static('public'));

//Lets express know to use pug templates in the views folder
app.set('view engine', 'pug');

// GET the homepage and include the projects from the json file
app.get('/', (req, res) => {
    res.render('index', { projects });
});

//GET the about page
app.get('/about', (req, res) => {
  res.render('about');
});

// GET the project page based on the project id. 
app.get('/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find( ({ id }) => id === +projectId );
  
  if (project) {
    res.render('project', { project });
  } else{
    res.render('page-not-found');
  }
});


/* ERROR HANDLERS */

// 404 handler to catch undefined or non-existent route requests
app.use((req, res, next) => {
  console.log('404 error handler called');
  res.status(404).render('page-not-found');
});

// Global error handler 
app.use((err, req, res, next) => {
  if (err) {
    console.log('Global error handler called', err);
  }

  if(err.status === 404) {
    res.status(404).render('page-not-found', {err});
  }else{
    err.message = err.message || `Oops! Looks like something went wrong on the server`;
    res.status(err.status || 500).render('error', {err});
  }
});


//Listens for connections on the specified host and port
app.listen(3000, () => {
    console.log('The application is running on localhost: 3000!');
});