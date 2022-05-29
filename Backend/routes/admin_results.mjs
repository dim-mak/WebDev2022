import express from 'express'
import { engine } from 'express-handlebars';
import { adminData as adminData } from './admin_search.mjs';

const app = express()
const router = express.Router();

import { db } from '../db.mjs'

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

router.route('/').get(function (req, res) {

    let users = [];
    // console.log(adminData)

    db.all("SELECT * FROM USER WHERE email = ? ", adminData.user_email, function (err, rows) {
        // console.log(rows);

        for (let i of rows) {
            users.push({ "email": i.email, "fname": i.fname, "lname": i.lname, "city": i.city, "zip_code": i.zip_code, "country": i.country });
        }

        res.render('admin_results', { users: users });
    });

});


router.route('/all').get(function (req, res) {

    let users = [];

    db.all("SELECT * FROM USER", function (err, rows) {

        for (let i of rows) {
            users.push({ "email": i.email, "fname": i.fname, "lname": i.lname, "city": i.city, "zip_code": i.zip_code, "country": i.country });
        }

        res.render('admin_results', { users: users });
    });

});


export { router };