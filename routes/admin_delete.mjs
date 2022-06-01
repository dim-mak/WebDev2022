import express from 'express'
import { engine } from 'express-handlebars';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'

router.route('/').get(function (req, res) {
    res.render('admin_delete', { alertRender: false });
});

router.route('/delete').get(function (req, res) {

    db.serialize(() => {
        db.all("SELECT email FROM USER WHERE email = ?", req.query.user_email, function (err, rows) {
            if (err) {
                return console.log(err.message);
            }
            // console.log(rows);

            if (rows && rows.length > 0) {
                db.run('DELETE FROM USER WHERE email = ?', req.query.user_email, function (err) {
                    if (err) {
                        return console.log(err.message);
                    }
                    console.log("User deleted by admin with email: " + req.query.user_email);
                });
                res.render('admin_delete', { alertRender: true, userDeleted: true });
            } else {
                res.render('admin_delete', { alertRender: true, userDeleted: false });
            }
        });
    });

});

export { router };