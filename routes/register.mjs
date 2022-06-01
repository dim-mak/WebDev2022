import express from 'express'
import { engine } from 'express-handlebars';
import bcrypt from 'bcrypt'

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'

function containsNumber(str) {
    return /\d/.test(str);
}

function containsLetter(str) {
    return /[a-zA-Z]/.test(str);
}

router.route('/').get(function (req, res) {
    res.render('register', { alertRender: false });
});

router.route('/add').get(function (req, res) {

    db.serialize(() => {
        db.all("SELECT email FROM USER WHERE email = ?", req.query.reg_email, async (err, rows) => {
            if (err) {
                return console.log(err.message);
            }
            // console.log(rows);

            if (rows && rows.length > 0) {
                res.render('register', { alertRender: true, accountCreated: false });
                console.log("User with this email already exists");
            } else {
                if (req.query.reg_pswd != req.query.reg_pswdconf) {
                    res.render('register', { alertRender: false, passwordsNotMatch: true });
                } else {
                    if (req.query.reg_pswd.length < 8 || req.query.reg_pswd.length > 16) {
                        res.render('register', { alertRender: false, passwordLengthError: true });
                    } else {
                        if (containsNumber(req.query.reg_pswd) == false) {
                            res.render('register', { alertRender: false, passwordNumError: true });
                        } else {
                            if (containsLetter(req.query.reg_pswd) == false) {
                                res.render('register', { alertRender: false, passwordLetterError: true });
                            } else {
                                let hashedPassword = await bcrypt.hash(req.query.reg_pswd, 10);
                                db.run('INSERT INTO USER(fname,lname,password,email,gender,street,street_no,city,region,zip_code,country) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
                                    [req.query.reg_first, req.query.reg_last, hashedPassword, req.query.reg_email, req.query.reg_sex, req.query.reg_str, req.query.reg_num,
                                    req.query.reg_city, req.query.reg_state, req.query.reg_taxcode, req.query.reg_country], function (err) {
                                        if (err) {
                                            return console.log(err.message);
                                        }
                                        console.log("User created account");
                                    });
                                res.render('register', { alertRender: true, accountCreated: true });
                            }
                        }
                    }

                }
            }
        });
    });

});

export { router };