const express = require('express');
const app = express();
const logger = require('./logger')
const course = require('./routes/courses');
const morgan = require('morgan')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground')
    .then(
        () => { console.log("connected to mongodb ...") },
        err => { console.log('can not connect' + err) }
    );
app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.json()); // in node js if any function return something so that will be a middleware 

app.use(express.urlencoded({ extended: true }));  // accept data in key & value pair

app.use(express.static('public'));

app.use(course); //  call all api's here

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
// console.log(`app: ${app.get('env')}`) // this will show environment of running app
app.use(logger);


app.get('/', (req, res) => {
    res.render('index', { title: 'Express App', message: 'Welcome to the node' })
})

if (app.get('env') === 'development') {
    app.use(morgan('tiny')); // this is third party lib which will show the api info in the terminal when u hit any api
    console.log("morgan enable in development mode ...")
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server at listening port ${port}..`));
