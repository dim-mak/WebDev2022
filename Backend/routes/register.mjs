import express from 'express'
import { engine } from 'express-handlebars';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'

router.route('/').get(function (req, res) {
    res.render('register', { alertRender: false });
});

router.route('/add').get(function (req, res) {

    db.serialize(() => {
        db.all("SELECT email FROM USER WHERE email = ?", req.query.reg_email, function (err, rows) {
            console.log(rows);

            if (rows && rows.length > 0) {
                res.render('register', { alertRender: true, accountCreated: false });
                console.log("User with this email already exists");
            } else {
                db.run('INSERT INTO USER(fname,lname,password,email,gender,street,street_no,city,region,zip_code,country) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
                    [req.query.reg_first, req.query.reg_last, req.query.reg_pswd, req.query.reg_email, req.query.reg_sex, req.query.reg_str, req.query.reg_num,
                    req.query.reg_city, req.query.reg_state, req.query.reg_taxcode, req.query.reg_country], function (err) {
                        if (err) {
                            return console.log(err.message);
                        }
                        console.log("User created account");
                    });
                res.render('register', { alertRender: true, accountCreated: true });
            }
        });
    });

});

export { router };