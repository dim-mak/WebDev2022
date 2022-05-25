import express from 'express'
import { engine } from 'express-handlebars';
import { data as data } from './search.mjs';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'


router.route('/').get(function (req, res) {

    let oneWay;
    let depart = data.search_from;
    let arrival = data.search_to;
    let flights = [];
    let flightsBack = [];

    let splitIndexDepart = depart.indexOf('-');
    let departAirport = depart.slice(0, splitIndexDepart - 1);
    let departCity = depart.slice(splitIndexDepart + 1, depart.length);

    let splitIndexArrival = arrival.indexOf('-');
    let arrivalAirport = arrival.slice(0, splitIndexArrival - 1);
    let arrivalCity = arrival.slice(splitIndexArrival + 1, arrival.length);

    if (data.one_way == 'on') {
        oneWay = true;
    } else {
        oneWay = false;
    }


    db.all("SELECT * FROM FLIGHT WHERE depart_date = ? AND depart_airport = ? AND dest_airport = ?", [data.trip_start, data.search_from, data.search_to], function (err, rows) {
        console.log(rows);

        for (let i of rows) {

            flights.push({ "departAirport": departAirport, "arrivalAirport": arrivalAirport, "departDate": i.depart_date, "arrivalDate": i.arrival_date, "departTime": i.depart_time, "arrivalTime": i.arrival_time, "airline": i.airline });
        }

    });



    if (data.trip_end != undefined) {

        console.log("There is a return flight");

        db.all("SELECT * FROM FLIGHT WHERE depart_date = ? AND depart_airport = ? AND dest_airport = ?", [data.trip_end, data.search_to, data.search_from], function (err, rows) {
            console.log(rows);

            for (let i of rows) {

                flightsBack.push({ "departAirportBack": arrivalAirport, "arrivalAirportBack": departAirport, "departDateBack": i.depart_date, "arrivalDateBack": i.arrival_date, "departTimeBack": i.depart_time, "arrivalTimeBack": i.arrival_time, "airlineBack": i.airline });
            }

        });

    }

    res.render('results', { oneWay, departCity, arrivalCity, flights, flightsBack: oneWay, departCity, arrivalCity, flights, flightsBack });



});



export { router };