import express from 'express'
import { engine } from 'express-handlebars';
import { adminData as adminData } from './admin_search.mjs';

const app = express()
const router = express.Router();

import { db } from '../db.mjs'

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

router.route('/').get(function (req, res) {

    let flights = [];
    // console.log(adminData)

    db.all("SELECT * FROM FLIGHT", function (err, rows) {
        if (err) {
            return console.log(err.message);
        }
        // console.log(rows);

        for (let i of rows) {
            flights.push({ "departAirport": i.depart_airport, "departDate": i.depart_date, "departTime": i.depart_time, "arrivalAirport": i.dest_airport, "arrivalDate": i.arrival_date, "arrivalTime": i.arrival_time });
        }

        res.render('admin_view_flights', { flights: flights });
    });

});


export { router };