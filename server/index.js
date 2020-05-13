const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const config        = require('./config');
// const Rental        = require('./models/rental');
const FakeDb        = require('./fake-db');
const path          = require('path');

const rentalRoutes   = require('./routes/rentals'),
      userRoutes     = require('./routes/users'),
      bookingRoutes  = require('./routes/bookings');


    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(config.DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(() => {
        console.log("Successfully connected to DB!");
        if(process.env.NODE_ENV === 'production') {
            const fakeDb = new FakeDb();
            // fakeDb.seedDb();
        }  
    }).catch(err => {
        console.log("ERROR:", err.message);
    });


const app = express();

app.use(bodyParser.json());


app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);


if(process.env.NODE_ENV === 'production') { 
    
    const appPath = path.join(__dirname, '..', 'dist/bwmNew');
    app.use(express.static(appPath));

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('App is running');
})