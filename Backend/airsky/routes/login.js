const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const db = new sqlite3.Database("./../airsky.db", (err) => {
    if (err) {
        console.log("Error Occurred - " + err.message);
    }
    else {
        console.log("DataBase Connected register");
    }
});


router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../../Frontend/login.html'));
});

router.post('/view', function (req, res) {
    // TODO: check if a user with this email exists
    db.serialize(() => {
        if (db.get('SELECT password FROM USER WHERE email = ?', req.body.mail) == req.body.pswd) {

            db.run('SELECT * FROM USER WHERE email = ?', req.body.mail, function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("User logged in");
                res.send("User with email = " + req.body.mail + " logged in");
            });
        }
        else {
            console.log("User did not log in");
            res.send("User with email = " + req.body.mail + " inserted invalid password");
        }
    });
});

module.exports = router;
