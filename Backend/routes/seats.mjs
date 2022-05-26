import express from 'express'
import { engine } from 'express-handlebars';
import { flightData as flightData } from './results.mjs';
import { flightDataBack as flightDataBack } from './results.mjs';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'


router.route('/').get(function (req, res) {

    db.all("SELECT * FROM SEAT AS S JOIN Ticket_Has_FlightSeat AS TFS ON S.seat_id = TFS.seat_id JOIN FLIGHT AS F ON F.flight_id = TFS.flight_id WHERE F.flight_id = ?", flightData, function (err, rows) {
        console.log(rows);
    });

    res.render('seats');

});



export { router };