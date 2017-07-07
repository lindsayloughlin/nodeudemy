const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var nowStr = new Date().toString();

    var log = `${nowStr}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('unable to append to server.log');
    });
    next();
});

// Middleware
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screemIt', (text)=>{
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    //response.send('<h1>hello express</h1>');
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to my website',
        likes: ['bikes', 'computers', 'books', 'tv'],
    });
});

app.get('/about', (req, res) => {
    //res.send('About page 123')
    res.render('about.hbs', {
        errorMessage: 'Unable to handle request',
        pageTitle: 'Hello world'
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page',
        myProject: 'best project ever'
    });
});

//bad 
app.get('/bad', (red, res) => {
    res.render({
        errorMessage: 'Unable to handle request'
    });
})
;

app.listen(port, () => {
    console.log('server is up on port 3000');
});