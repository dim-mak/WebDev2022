import express from 'express'
import { engine } from 'express-handlebars';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'

router.route('/').get(function (req, res) {
    res.render('admin_add', { alertRender: false });
});

router.route('/add').get(function (req, res) {

    db.serialize(() => {
        db.all("SELECT email FROM USER WHERE email = ?", req.query.email, function (err, rows) {
            if (err) {
                return console.log(err.message);
            }
            // console.log(rows);

            if (rows && rows.length > 0) {
                res.render('admin_add', { alertRender: true, userAdded: false });
                // console.log("User with this email already exists");
            } else {
                db.run('INSERT INTO USER(fname,lname,email,gender,street,street_no,city,region,zip_code,country) VALUES(?,?,?,?,?,?,?,?,?,?)',
                    [req.query.fname, req.query.lname, req.query.email, req.query.sex, req.query.street, req.query.street_no,
                    req.query.city, req.query.region, req.query.zip_code, req.query.country], function (err) {
                        if (err) {
                            return console.log(err.message);
                        }
                        console.log("User added by admin with email: " + req.query.email);
                    });
                res.render('admin_add', { alertRender: true, userAdded: true });
            }
        });
    });

});

export { router };