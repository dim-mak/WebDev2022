import express from 'express'
import { engine } from 'express-handlebars';
import { db } from '../db.mjs';
import { data as searchData } from './search.mjs';
import { seatsData as seatsData } from './seats.mjs';
import { seatsDataBack as seatsDataBack } from './seats_back.mjs';
import { data as userData } from './results.mjs';

console.log(seatsData);

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

router.route('/').get(function (req, res) {

    res.render('checkout');

});

router.route('/pay').get(function (req, res) {

    let oneWay;

    if (searchData.one_way == 'on') {
        oneWay = true;
    } else {
        oneWay = false;
    }

    // console.log(userData)

    db.serialize(() => {

        db.all("SELECT * FROM USER WHERE email = ?", req.session.loggedUserEmail, function (err, rows) {
            if (err) {
                return console.log(err.message);
            }
            let id = rows[0].user_id;

            db.all("INSERT INTO RESERVATION(adults_no, minors_no, passengers_no, one_way, user_id) VALUES (?,?,?,?,?)",
                [searchData.adult_pass, searchData.minor_pass, searchData.adult_pass + searchData.minor_pass, oneWay, id], function (err, rows) {
                    if (err) {
                        return console.log(err.message);
                    }

                    db.all("SELECT MAX(res_id) AS maxres_id FROM RESERVATION", function (err, rows) {
                        if (err) {
                            return console.log(err.message);
                        }
                        let resId = rows[0].maxres_id;

                        for (let j of seatsData) {

                            db.all("SELECT seat_id FROM SEAT WHERE flight_id = ? AND code = ?", [userData.options, j], function (err, rows) {
                                if (err) {
                                    return console.log(err.message);
                                }
                                // console.log(rows)
                                let seatId = rows[0].seat_id;

                                db.all("INSERT INTO TICKET(res_id, seat_id) VALUES (?, ?)", [resId, seatId], function (err, rows) {
                                    if (err) {
                                        return console.log(err.message);
                                    }

                                });
                            });
                        }

                        if (searchData.one_way == 'on') {

                            res.redirect('/final');

                        } else {

                            for (let j of seatsDataBack) {

                                db.all("SELECT seat_id FROM SEAT WHERE flight_id = ? AND code = ?", [userData.optionsBack, j], function (err, rows) {
                                    if (err) {
                                        return console.log(err.message);
                                    }
                                    // console.log(rows)
                                    let seatIdBack = rows[0].seat_id;

                                    db.all("INSERT INTO TICKET(res_id, seat_id) VALUES (?, ?)", [resId, seatIdBack], function (err, rows) {
                                        if (err) {
                                            return console.log(err.message);
                                        }

                                    });
                                });
                            }

                            res.redirect('/final');

                        }

                    });

                });

        });

    })

});




export { router };