import express from 'express'
import { engine } from 'express-handlebars';
import { db } from '../db.mjs';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

router.route('/').get(function (req, res) {

    let ticketData = [];

    db.all("SELECT * FROM USER WHERE email = ?", req.session.loggedUserEmail, function (err, user) {
        if (err) {
            return console.log(err.message);
        }
        let userId = user[0].user_id;

        db.all("SELECT * FROM RESERVATION WHERE user_id = ?", userId, function (err, reserv) {
            if (err) {
                return console.log(err.message);
            }
            // console.log(res)

            for (let i = 0; i < reserv.length; i++) {

                db.all("SELECT * FROM TICKET WHERE res_id = ?", reserv[i].res_id, function (err, ticket) {
                    if (err) {
                        return console.log(err.message);
                    }

                    for (let j = 0; j < ticket.length; j++) {

                        db.all("SELECT * FROM SEAT WHERE seat_id = ?", ticket[j].seat_id, function (err, seat) {
                            if (err) {
                                return console.log(err.message);
                            }
                            let flightId = seat[0].flight_id;

                            db.all("SELECT * FROM FLIGHT WHERE flight_id = ?", flightId, function (err, flight) {
                                if (err) {
                                    return console.log(err.message);
                                }

                                ticketData.push({
                                    "departAirport": flight[0].depart_airport, "departDate": flight[0].depart_date, "departTime": flight[0].depart_time,
                                    "destinationAirport": flight[0].dest_airport, "arrivalDate": flight[0].arrival_date, "arrivalTime": flight[0].arrival_time,
                                    "seatType": seat[0].seat_type, "seatCode": seat[0].code, "ticketId": ticket[j].ticket_id
                                });



                                // console.log(ticketData)

                            });

                        });

                    }

                    res.render('tickets', { ticketData: ticketData });

                });
            }

        })


    });

});


export { router };