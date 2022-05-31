import express from 'express'
import { engine } from 'express-handlebars';
import { data as searchData } from './search.mjs';
import { data as userData } from './results.mjs';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'


let seatsBoolean = [false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
];

const seats = ['1A', '1B', '1C', '1D', '1E', '1F',
    '2A', '2B', '2C', '2D', '2E', '2F',
    '3A', '3B', '3C', '3D', '3E', '3F',
    '4A', '4B', '4C', '4D', '4E', '4F',
    '5A', '5B', '5C', '5D', '5E', '5F',
    '6A', '6B', '6C', '6D', '6E', '6F',
    '7A', '7B', '7C', '7D', '7E', '7F',
    '8A', '8B', '8C', '8D', '8E', '8F',
    '9A', '9B', '9C', '9D', '9E', '9F'
];

let A1, B1, C1, D1, E1, F1,
    A2, B2, C2, D2, E2, F2,
    A3, B3, C3, D3, E3, F3,
    A4, B4, C4, D4, E4, F4,
    A5, B5, C5, D5, E5, F5,
    A6, B6, C6, D6, E6, F6,
    A7, B7, C7, D7, E7, F7,
    A8, B8, C8, D8, E8, F8,
    A9, B9, C9, D9, E9, F9;

let gold, buss, eco;


router.route('/').get(function (req, res) {
    // console.log(userData);

    db.serialize(() => {
        db.all("SELECT * FROM SEAT AS S JOIN FLIGHT AS F ON S.flight_id = F.flight_id WHERE F.flight_id = ? ", userData.options, function (err, rows) {
            // console.log(rows)

            for (let j of rows) {
                if (j.code == '1A') {
                    gold = j.price;
                }
                if (j.code == '2A') {
                    buss = j.price;
                }
                if (j.code == '4A') {
                    eco = j.price;
                }
            }


            for (let i of rows) {
                if (i.occupied == 1) {
                    // console.log(i.code)
                    for (let k in seats) {
                        if (seats[k] == i.code) {
                            seatsBoolean[k] = true;
                        }
                    }
                }
            }


            // console.log(seatsBoolean)

            A1 = seatsBoolean[0];
            B1 = seatsBoolean[1];
            C1 = seatsBoolean[2];
            D1 = seatsBoolean[3];
            E1 = seatsBoolean[4];
            F1 = seatsBoolean[5];

            A2 = seatsBoolean[6];
            B2 = seatsBoolean[7];
            C2 = seatsBoolean[8];
            D2 = seatsBoolean[9];
            E2 = seatsBoolean[10];
            F2 = seatsBoolean[11];

            A3 = seatsBoolean[12];
            B3 = seatsBoolean[13];
            C3 = seatsBoolean[14];
            D3 = seatsBoolean[15];
            E3 = seatsBoolean[16];
            F3 = seatsBoolean[17];

            A4 = seatsBoolean[18];
            B4 = seatsBoolean[19];
            C4 = seatsBoolean[20];
            D4 = seatsBoolean[21];
            E4 = seatsBoolean[22];
            F4 = seatsBoolean[23];

            A5 = seatsBoolean[24];
            B5 = seatsBoolean[25];
            C5 = seatsBoolean[26];
            D5 = seatsBoolean[27];
            E5 = seatsBoolean[28];
            F5 = seatsBoolean[29];

            A6 = seatsBoolean[30];
            B6 = seatsBoolean[31];
            C6 = seatsBoolean[32];
            D6 = seatsBoolean[33];
            E6 = seatsBoolean[34];
            F6 = seatsBoolean[35];

            A7 = seatsBoolean[36];
            B7 = seatsBoolean[37];
            C7 = seatsBoolean[38];
            D7 = seatsBoolean[39];
            E7 = seatsBoolean[40];
            F7 = seatsBoolean[41];

            A8 = seatsBoolean[42];
            B8 = seatsBoolean[43];
            C8 = seatsBoolean[44];
            D8 = seatsBoolean[45];
            E8 = seatsBoolean[46];
            F8 = seatsBoolean[47];

            A9 = seatsBoolean[48];
            B9 = seatsBoolean[49];
            C9 = seatsBoolean[50];
            D9 = seatsBoolean[51];
            E9 = seatsBoolean[52];
            F9 = seatsBoolean[53];

            res.render('seats', {
                gold, buss, eco,
                A1, B1, C1, D1, E1, F1,
                A2, B2, C2, D2, E2, F2,
                A3, B3, C3, D3, E3, F3,
                A4, B4, C4, D4, E4, F4,
                A5, B5, C5, D5, E5, F5,
                A6, B6, C6, D6, E6, F6,
                A7, B7, C7, D7, E7, F7,
                A8, B8, C8, D8, E8, F8,
                A9, B9, C9, D9, E9, F9:
                    gold, buss, eco,
                A1, B1, C1, D1, E1, F1,
                A2, B2, C2, D2, E2, F2,
                A3, B3, C3, D3, E3, F3,
                A4, B4, C4, D4, E4, F4,
                A5, B5, C5, D5, E5, F5,
                A6, B6, C6, D6, E6, F6,
                A7, B7, C7, D7, E7, F7,
                A8, B8, C8, D8, E8, F8,
                A9, B9, C9, D9, E9, F9
            });

        });

    })

});



router.route('/add').get(function (req, res) {
    let selectedSeats = Object.keys(req.query);
    // console.log(selectedSeats);

    let passengersNo;
    if (searchData.minor_pass == '') {
        passengersNo = parseInt(searchData.adult_pass);
    } else {
        passengersNo = parseInt(searchData.minor_pass) + parseInt(searchData.adult_pass);
    }
    // console.log(passengersNo)

    if (selectedSeats.length == passengersNo) {

        for (let i of selectedSeats) {
            db.serialize(() => {
                db.run("UPDATE SEAT SET occupied = 1 WHERE flight_id = ? AND code = ? ", [userData.options, i], function (err, rows) {
                    if (err) {
                        return console.log(err.message);
                    }
                    // console.log(rows)
                });
            });
        }

        if (searchData.trip_end != undefined) {
            res.redirect('/seats_back');
        }
        else {
            res.redirect('/checkout');
        }

    } else {

        db.serialize(() => {
            db.all("SELECT * FROM SEAT AS S JOIN FLIGHT AS F ON S.flight_id = F.flight_id WHERE F.flight_id = ? ", [userData.options], function (err, rows) {
                if (err) {
                    return console.log(err.message);
                }
                // console.log(rows)

                for (let j of rows) {
                    if (j.code == '1A') {
                        gold = j.price;
                    }
                    if (j.code == '2A') {
                        buss = j.price;
                    }
                    if (j.code == '4A') {
                        eco = j.price;
                    }
                }


                for (let i of rows) {
                    if (i.occupied == 1) {
                        // console.log(i.code)
                        for (let k in seats) {
                            if (seats[k] == i.code) {
                                seatsBoolean[k] = true;
                            }
                        }
                    }
                }


                // console.log(seatsBoolean)

                A1 = seatsBoolean[0];
                B1 = seatsBoolean[1];
                C1 = seatsBoolean[2];
                D1 = seatsBoolean[3];
                E1 = seatsBoolean[4];
                F1 = seatsBoolean[5];

                A2 = seatsBoolean[6];
                B2 = seatsBoolean[7];
                C2 = seatsBoolean[8];
                D2 = seatsBoolean[9];
                E2 = seatsBoolean[10];
                F2 = seatsBoolean[11];

                A3 = seatsBoolean[12];
                B3 = seatsBoolean[13];
                C3 = seatsBoolean[14];
                D3 = seatsBoolean[15];
                E3 = seatsBoolean[16];
                F3 = seatsBoolean[17];

                A4 = seatsBoolean[18];
                B4 = seatsBoolean[19];
                C4 = seatsBoolean[20];
                D4 = seatsBoolean[21];
                E4 = seatsBoolean[22];
                F4 = seatsBoolean[23];

                A5 = seatsBoolean[24];
                B5 = seatsBoolean[25];
                C5 = seatsBoolean[26];
                D5 = seatsBoolean[27];
                E5 = seatsBoolean[28];
                F5 = seatsBoolean[29];

                A6 = seatsBoolean[30];
                B6 = seatsBoolean[31];
                C6 = seatsBoolean[32];
                D6 = seatsBoolean[33];
                E6 = seatsBoolean[34];
                F6 = seatsBoolean[35];

                A7 = seatsBoolean[36];
                B7 = seatsBoolean[37];
                C7 = seatsBoolean[38];
                D7 = seatsBoolean[39];
                E7 = seatsBoolean[40];
                F7 = seatsBoolean[41];

                A8 = seatsBoolean[42];
                B8 = seatsBoolean[43];
                C8 = seatsBoolean[44];
                D8 = seatsBoolean[45];
                E8 = seatsBoolean[46];
                F8 = seatsBoolean[47];

                A9 = seatsBoolean[48];
                B9 = seatsBoolean[49];
                C9 = seatsBoolean[50];
                D9 = seatsBoolean[51];
                E9 = seatsBoolean[52];
                F9 = seatsBoolean[53];

                let alertRender = true;

                res.render('seats', {
                    alertRender, passengersNo,
                    gold, buss, eco,
                    A1, B1, C1, D1, E1, F1,
                    A2, B2, C2, D2, E2, F2,
                    A3, B3, C3, D3, E3, F3,
                    A4, B4, C4, D4, E4, F4,
                    A5, B5, C5, D5, E5, F5,
                    A6, B6, C6, D6, E6, F6,
                    A7, B7, C7, D7, E7, F7,
                    A8, B8, C8, D8, E8, F8,
                    A9, B9, C9, D9, E9, F9:
                        alertRender, passengersNo,
                    gold, buss, eco,
                    A1, B1, C1, D1, E1, F1,
                    A2, B2, C2, D2, E2, F2,
                    A3, B3, C3, D3, E3, F3,
                    A4, B4, C4, D4, E4, F4,
                    A5, B5, C5, D5, E5, F5,
                    A6, B6, C6, D6, E6, F6,
                    A7, B7, C7, D7, E7, F7,
                    A8, B8, C8, D8, E8, F8,
                    A9, B9, C9, D9, E9, F9
                });

            });

        })
    }

});



export { router };