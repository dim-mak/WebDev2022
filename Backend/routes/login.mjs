import express from 'express'
import { engine } from 'express-handlebars';
import session from 'express-session';
import { db } from '../db.mjs'

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');


router.route('/').get(function (req, res) {

    res.render('login', {alertRender: false});

});

router.route('/data').get(function (req, res) {

    let email = req.query.mail;
    let pswd = req.query.pswd;

    db.serialize(() => {
        db.all("SELECT * FROM USER WHERE email = ? AND password = ?", [email, pswd], function (err, rows) {
            if (err) {
                console.log(err)
            }
            else if (rows.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;

                res.render('search'); // FIXME:
            }
            else {
                res.render('login', {alertRender: true})
            }
        });
    });

});

export { router };