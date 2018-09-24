const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// process.env object that stores all of our environment variables as key value pairs
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// middleware - reading from static directory
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.get('/', (req, res) =>{
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Hello there! Welcome to my Website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

// /bad - send back json with
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'JSON data not found'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
