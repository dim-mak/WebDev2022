const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const db = new sqlite3.Database("./../airsky.db", (err) => {
    if (err) {
        console.log("Error Occurred - " + err.message);
    }
    else {
        console.log("DataBase Connected admin_search");
    }
});


router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../../Frontend/admin_search.html'));
});

router.post('/view', function (req, res) {
    db.serialize(() => {
        db.run('SELECT * FROM USER WHERE email = ?', req.body.user_email, function (err) {
            if (err) {
                res.send("Error encountered while searching");
                return console.log(err.message);
            }
            res.send("Search results for user with email = " + req.body.user_email);
        });
    });
});

module.exports = router;
