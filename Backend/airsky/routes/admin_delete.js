const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const db = new sqlite3.Database("./../airsky.db", (err) => {
    if (err) {
        console.log("Error Occurred - " + err.message);
    }
    else {
        console.log("DataBase Connected admin_delete");
    }
});


router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../../Frontend/admin_delete.html'));
});


router.post('/delete', function (req, res) {
    db.serialize(() => {
        db.run('DELETE FROM USER WHERE email = ?', req.body.user_email, function (err) {
            if (err) {
                res.send("Error encountered while deleting");
                return console.error(err.message);
            }
            console.log("User deleted from database");
            res.send("User with email = " + req.body.user_email + " deleted from database");
        });
    });
});

module.exports = router;
