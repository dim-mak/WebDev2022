var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require("path");
// const bodyParser = require('body-parser');
// const helmet = require('helmet');
// const rateLimit = require("express-rate-limit");

const db = new sqlite3.Database("./../airsky.db", (err) => {
    if (err) {
        console.log("Error Occurred - " + err.message);
    }
    else {
        console.log("DataBase Connected admin_add");
    }
});


router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../../Frontend/admin_add.html'));
});

router.post('/add', function (req, res) {
    db.serialize(() => {
        db.run('INSERT INTO USER(fname,lname,email,gender,street,street_no,city,region,zip_code,country) VALUES(?,?,?,?,?,?,?,?,?,?)',
            [req.body.fname, req.body.lname, req.body.email, req.body.sex, req.body.street, req.body.street_no,
            req.body.city, req.body.region, req.body.zip_code, req.body.country], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("New user added by admin");
                res.send("New user added by admin to database with email = " + req.body.email + " and name = " + req.body.fname + " " + req.body.lname);
            });
    });
});

module.exports = router;
