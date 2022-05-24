import express from 'express'
import { engine } from 'express-handlebars';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'

router.route('/').get(function (req, res) {
    res.render('admin_update', { alertRender: false });
});

router.route('/view').get(function (req, res) {

    db.serialize(() => {
        db.all("SELECT email FROM USER WHERE email = ?", req.query.user_email, function (err, rows) {
            console.log(rows);

            if (rows && rows.length > 0) {
                // prepei prwta na emfanizontai ta stoixeia tou user sto modal k meta na trexei o kwdikas parakatw

                db.run('UPDATE USER SET fname=?,lname=?,email=?,gender=?,street=?,street_no=?,city=?,region=?,zip_code=?,country=? WHERE email = ?',
                    [req.query.fname, req.query.lname, req.query.email, req.query.sex, req.query.street, req.query.street_no,
                    req.query.city, req.query.region, req.query.zip_code, req.query.country, req.query.email], function (err) {
                        if (err) {
                            return console.log(err.message);
                        }
                        console.log("User updated by admin");
                    });
                res.render('admin_update', { alertRender: true, userUpdated: true });
            } else {
                res.render('admin_update', { alertRender: true, userUpdated: false });
                console.log("User with this email does not exist");
            }
        });
    });

});

export { router };