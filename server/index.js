const express       = require('express');
const mongoose      = require('mongoose');
const config        = require('./config/dev');
const Rental        = require('./models/rental');
const FakeDb        = require('./fake-db');
const rentalRoutes  = require('./routes/rentals');


    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(() => {
        console.log("Successfully connected to DB!");
        const fakeDb = new FakeDb();
        fakeDb.seedDb();
    }).catch(err => {
        console.log("ERROR:", err.message);
    });


const app = express();


app.use('/api/v1/rentals', rentalRoutes);



const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('App is running');
})