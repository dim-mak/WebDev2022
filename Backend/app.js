const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");

const app = express();
const server = http.createServer(app);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});


const db = new sqlite3.Database("airsky.db", (err) => {
    if (err) {
        console.log("Error Occurred - " + err.message);
    }
    else {
        console.log("DataBase Connected");
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../Frontend')));
app.use(helmet());
app.use(limiter);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../Frontend/register.html'));
});

// Insert
app.post('/add', function (req, res) {
    db.serialize(() => {
        db.run('INSERT INTO USER(fname,lname,password,email,gender,street,street_no,city,region,zip_code,country) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
            [req.body.reg_first, req.body.reg_last, req.body.reg_pswd, req.body.reg_email, req.body.reg_sex, req.body.reg_str, req.body.reg_num,
            req.body.reg_city, req.body.reg_state, req.body.reg_taxcode, req.body.reg_country], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("New user added");
                res.send("New employee has been added into the database with email = " + req.body.reg_email + " and Name = " + req.body.reg_first + " " + req.body.reg_last);
            });
    });
});

app.get('/close', function (req, res) {
    db.close((err) => {
        if (err) {
            res.send('There is some error in closing the database');
            return console.error(err.message);
        }
        console.log('Closing the database connection.');
        res.send('Database connection successfully closed');
    });
});

server.listen(3000, function () {
    console.log("Server listening on port: 3000");
});