const mongoose = require('mongoose');

mongoose.connect("dbconnectionlink", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log('Database connected successfully ') }).catch((err) => { console.log('Error connecting to database ' + err) });
