import express from 'express'
import { engine } from 'express-handlebars';
import { data as data } from './search.mjs';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'


let gold, buss, eco;
function exportGold(price) { gold = price; }
function exportBussiness(price) { buss = price; }
function exportEconomy(price) { eco = price; }


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




    db.all("SELECT * FROM FLIGHT WHERE depart_date = ? AND depart_airport = ? AND dest_airport = ? LIMIT 5", [data.trip_start, data.search_from, data.search_to], function (err, rows) {
        // console.log(rows);


        for (let i of rows) {

            db.serialize(() => {

                db.all("SELECT price FROM SEAT WHERE seat_type = 'gold' AND flight_id = ?", i.flight_id, function (err, gold) {
                    let goldPrice = gold[0].price;
                    exportGold(goldPrice);

                });
                db.all("SELECT price FROM SEAT WHERE seat_type = 'bussiness' AND flight_id = ?", i.flight_id, function (err, buss) {
                    let bussPrice = buss[0].price;
                    exportBussiness(bussPrice);
                });
                db.all("SELECT price FROM SEAT WHERE seat_type = 'economy' AND flight_id = ?", i.flight_id, function (err, eco) {
                    let ecoPrice = eco[0].price;
                    exportEconomy(ecoPrice);
                });

            })

            flights.push({ "flightId": i.flight_id, "departAirport": departAirport, "arrivalAirport": arrivalAirport, "departDate": i.depart_date, "arrivalDate": i.arrival_date, "departTime": i.depart_time, "arrivalTime": i.arrival_time, "airline": i.airline, "goldPrice": gold, "bussPrice": buss, "ecoPrice": eco });
        }

    });


    // db.all("SELECT * FROM FLIGHT WHERE depart_date = ? AND depart_airport = ? AND dest_airport = ? LIMIT 5", [data.trip_start, data.search_from, data.search_to], function (err, rows) {
    //     // console.log(rows);

    //     for (let i of rows) {

    //         db.all("SELECT price FROM SEAT WHERE seat_type = 'gold' AND flight_id = ?", i.flight_id, function (err, gold) {
    //             // console.log(gold);
    //             let goldPrice = gold[0];

    //             db.all("SELECT price FROM SEAT WHERE seat_type = 'bussiness' AND flight_id = ?", i.flight_id, function (err, buss) {
    //                 let bussPrice = buss[0];

    //                 db.all("SELECT price FROM SEAT WHERE seat_type = 'economy' AND flight_id = ?", i.flight_id, function (err, eco) {
    //                     let ecoPrice = eco[0];
    //                     // console.log(i.flight_id, goldPrice.price, bussPrice.price, ecoPrice.price)

    //                     flights.push({ "flightId": i.flight_id, "departAirport": departAirport, "arrivalAirport": arrivalAirport, "departDate": i.depart_date, "arrivalDate": i.arrival_date, "departTime": i.depart_time, "arrivalTime": i.arrival_time, "airline": i.airline, "goldPrice": goldPrice.price, "bussPrice": bussPrice.price, "ecoPrice": ecoPrice.price });
    //                 });
    //             });
    //         });
    //     }
    // });


    if (data.trip_end != undefined) {

        console.log("There is a return flight");

        db.all("SELECT * FROM FLIGHT WHERE depart_date = ? AND depart_airport = ? AND dest_airport = ? LIMIT 5", [data.trip_end, data.search_to, data.search_from], function (err, rows) {
            // console.log(rows);

            for (let i of rows) {
                db.serialize(() => {

                    db.all("SELECT price FROM SEAT WHERE seat_type = 'gold' AND flight_id = ?", i.flight_id, function (err, gold) {
                        let goldPrice = gold[0].price;
                        exportGold(goldPrice);

                    });
                    db.all("SELECT price FROM SEAT WHERE seat_type = 'bussiness' AND flight_id = ?", i.flight_id, function (err, buss) {
                        let bussPrice = buss[0].price;
                        exportBussiness(bussPrice);
                    });
                    db.all("SELECT price FROM SEAT WHERE seat_type = 'economy' AND flight_id = ?", i.flight_id, function (err, eco) {
                        let ecoPrice = eco[0].price;
                        exportEconomy(ecoPrice);
                    });

                })

                flightsBack.push({ "flightIdBack": i.flight_id, "departAirportBack": arrivalAirport, "arrivalAirportBack": departAirport, "departDateBack": i.depart_date, "arrivalDateBack": i.arrival_date, "departTimeBack": i.depart_time, "arrivalTimeBack": i.arrival_time, "airlineBack": i.airline, "goldPriceBack": gold, "bussPriceBack": buss, "ecoPriceBack": eco });

            }
        });

    }

    res.render('results', { oneWay, departCity, arrivalCity, flights, flightsBack: oneWay, departCity, arrivalCity, flights, flightsBack });

});

router.route('/get').get(function (req, res) {
    let f = req.query;
    console.log(f);
    console.log("hi")

    res.redirect('/seats');
});

export { router };