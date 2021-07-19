const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

//middle ware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// routes ref
app.use(require('./routes'));

// mongodb setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
    useFindAndModify: false,
    useNewUrlParser: false,
    useUnifiedTopology: true
});


// string will log mongo quries to console
mongoose.set('debug', true);

// start
app.listen(PORT, () =>{
    const helloString = 'HERE WE ARE';
    console.log(`
    🌍 Connected on localhost:${PORT}    ${helloString}`)
});