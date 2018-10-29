const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');

//helper

//Busca ano atual
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//uppercase
hbs.registerHelper('textUpperCase', (text) => {
  return text.toUpperCase();
});

var app = express();
app.set('view engine', 'hbs');

//before reload page
app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url} \n`;
    console.log(log);
    fs.appendFile('server.log', log, (err) => {
      if(err){
        console.log(err);
      }
    });
  next();
});


// app.use( (req, res, next) => {
//   res.render('manutencao.hbs');
// });

//static html
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    pageTitle: 'Home Title',
    subTitle: 'home sub title'
  })
});

app.get('/sobre', (req, res) => {
    res.render('sobre.hbs', {
      pageTitle: 'Sobre o Página'
    });
});

app.listen(port, () => {
  console.log(`Server connect in port ${port}`);
});
