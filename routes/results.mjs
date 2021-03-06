import express from 'express'
import { engine } from 'express-handlebars';
import { data as searchData } from './search.mjs';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'


router.route('/').get(function (req, res) {

    let oneWay;
    let depart = searchData.search_from;
    let arrival = searchData.search_to;
    let flights = [];
    let flightsBack = [];

    let splitIndexDepart = depart.indexOf('-');
    let departAirport = depart.slice(0, splitIndexDepart - 1);
    let departCity = depart.slice(splitIndexDepart + 1, depart.length);

    let splitIndexArrival = arrival.indexOf('-');
    let arrivalAirport = arrival.slice(0, splitIndexArrival - 1);
    let arrivalCity = arrival.slice(splitIndexArrival + 1, arrival.length);

    if (searchData.one_way == 'on') {
        oneWay = true;
    } else {
        oneWay = false;
    }


    db.all("SELECT * FROM FLIGHT WHERE depart_date = ? AND depart_airport = ? AND dest_airport = ? LIMIT 5", [searchData.trip_start, searchData.search_from, searchData.search_to], function (err, rows) {
        if (err) {
            return console.log(err.message);
        }
        // console.log(rows);
        if (rows && rows.length) {

            for (let i of rows) {

                flights.push({ "flightId": i.flight_id, "departAirport": departAirport, "arrivalAirport": arrivalAirport, "departDate": i.depart_date, "arrivalDate": i.arrival_date, "departTime": i.depart_time, "arrivalTime": i.arrival_time, "airline": i.airline });
            }
            if (searchData.trip_end == undefined) {
                res.render('results', { oneWay: oneWay, departCity: departCity, arrivalCity: arrivalCity, flights: flights, flightsBack: flightsBack, alertRender: false });
            }
        } else {
            res.render('results', { oneWay: oneWay, departCity: departCity, arrivalCity: arrivalCity, flights: flights, flightsBack: flightsBack, alertRender: true });
        }

    });


    if (searchData.trip_end != undefined) {

        // console.log("There is a return flight");

        db.all("SELECT * FROM FLIGHT WHERE depart_date = ? AND depart_airport = ? AND dest_airport = ? LIMIT 5", [searchData.trip_end, searchData.search_to, searchData.search_from], function (err, rows) {
            if (err) {
                return console.log(err.message);
            }
            // console.log(rows);

            if (rows && rows.length > 0) {

                for (let i of rows) {

                    flightsBack.push({ "flightIdBack": i.flight_id, "departAirportBack": arrivalAirport, "arrivalAirportBack": departAirport, "departDateBack": i.depart_date, "arrivalDateBack": i.arrival_date, "departTimeBack": i.depart_time, "arrivalTimeBack": i.arrival_time, "airlineBack": i.airline });
                }
                res.render('results', { oneWay: oneWay, departCity: departCity, arrivalCity: arrivalCity, flights: flights, flightsBack: flightsBack, alertRender: false });

            } else {
                res.render('results', { oneWay: oneWay, departCity: departCity, arrivalCity: arrivalCity, flights: flights, flightsBack: flightsBack, alertRender: true });
            }
        });

    }

});


router.route('/get').get(function (req, res) {
    let userSelection = req.query;
    // console.log(userSelection);

    exportData(userSelection);

    res.redirect('/seats');

});

let data;
function exportData(userSelection) {
    data = userSelection;
}

export { data };
export { router };
