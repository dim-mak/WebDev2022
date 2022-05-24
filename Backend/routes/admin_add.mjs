import express from 'express'
import { engine } from 'express-handlebars';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'


let userAdded = false;

router.route('/').get(function (req, res) {
    res.render('admin_add', { userAdded: userAdded });
});

router.route('/add').get(function (req, res) {
    let alertRender = true;
    userAdded = true;
    db.serialize(() => {
        db.run('INSERT INTO USER(fname,lname,email,gender,street,street_no,city,region,zip_code,country) VALUES(?,?,?,?,?,?,?,?,?,?)',
            [req.query.fname, req.query.lname, req.query.email, req.query.sex, req.query.street, req.query.street_no,
            req.query.city, req.query.region, req.query.zip_code, req.query.country], function (err) {
                if (err) {
                    alertRender = false;
                    return console.log(err.message);
                }
                console.log("New user added by admin");
            });
    });

    res.render('admin_add', { alertRender: alertRender, userAdded: userAdded });

});

export { router };