var express = require('express');
var router = express.Router();
// const sqlite3 = require('sqlite3').verbose();
const path = require("path");
// const bodyParser = require('body-parser');
// const helmet = require('helmet');
// const rateLimit = require("express-rate-limit");

// const db = new sqlite3.Database("./../airsky.db", (err) => {
//     if (err) {
//         console.log("Error Occurred - " + err.message);
//     }
//     else {
//         console.log("DataBase Connected");
//     }
// });


router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../../Frontend/search.html'));
});

// router.post('/register/add', function (req, res) {
//     db.serialize(() => {
//         db.run('INSERT INTO USER(fname,lname,password,email,gender,street,street_no,city,region,zip_code,country) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
//             [req.body.reg_first, req.body.reg_last, req.body.reg_pswd, req.body.reg_email, req.body.reg_sex, req.body.reg_str, req.body.reg_num,
//             req.body.reg_city, req.body.reg_state, req.body.reg_taxcode, req.body.reg_country], function (err) {
//                 if (err) {
//                     return console.log(err.message);
//                 }
//                 console.log("New user added");
//                 res.send("New user added to database with email = " + req.body.reg_email + " and name = " + req.body.reg_first + " " + req.body.reg_last);
//             });
//     });
// });

module.exports = router;
