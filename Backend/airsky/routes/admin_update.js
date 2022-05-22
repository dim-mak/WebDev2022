var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const db = new sqlite3.Database("./../airsky.db", (err) => {
    if (err) {
        console.log("Error Occurred - " + err.message);
    }
    else {
        console.log("DataBase Connected admin_update");
    }
});


router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../../Frontend/admin_update.html'));
});


// fix update
router.post('/update', function (req, res) {
    db.serialize(() => {
        db.run('SELECT * FROM USER WHERE email = ?', req.body.user_email, function (err, results) {
            if (err) {
                res.send("Error encountered while deleting");
                return console.error(err.message);
            }
            console.log("Select query sent");
            res.send(json(results));
        });
    });
});

module.exports = router;
