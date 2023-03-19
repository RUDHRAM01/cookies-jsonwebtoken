const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://rudhram:rudhram@cluster0.4xvlplx.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log('Database connected successfully ') }).catch((err) => { console.log('Error connecting to database ' + err) });