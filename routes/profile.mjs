import express from 'express'
import { engine } from 'express-handlebars';
import session from 'express-session'

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'

let data;


router.route('/').get(function (req, res) {
    db.all("SELECT * FROM USER WHERE email = ?", req.session.loggedUserEmail, function (err, rows) { 
        if (err) {
            return console.log(err.message);
        }
        // console.log(rows);
        data = rows[0];
        res.render('profile', { data: data });
    });

});


router.route('/update').get(function (req, res) {
    console.log(req.query.fname);
    db.serialize(() => {
        db.run('UPDATE USER SET fname=?,lname=?,gender=?,street=?,street_no=?,city=?,region=?,zip_code=?,country=? WHERE  email = ?',
            [req.query.fname, req.query.lname, req.query.sex, req.query.street, req.query.street_no,
            req.query.city, req.query.region, req.query.zip_code, req.query.country, req.session.loggedUserEmail], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("User profile updated");


                db.all("SELECT * FROM USER WHERE email = ?", req.session.loggedUserEmail, function (err, rows) {
                    if (err) {
                        return console.log(err.message);
                    }
                    // console.log(rows);
                    data = rows[0];

                    res.render('profile', { data: data, alertRender: true });
                });
            });
    });

});

export { router };