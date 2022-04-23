const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');

// Connecting Database
let db = new sqlite3.Database("airsky.db", (err) => {
    if (err) {
        console.log("Error Occurred - " + err.message);
    }
    else {
        console.log("DataBase Connected");
    }
});

app.get("/", (req, res) => {
    res.send("Connection Established");
});

// Server Running
app.listen(4000, () => {
    console.log("Server started");
});

// db.run('INSERT INTO SEAT_TYPE(price, type) VALUES(1500.8, "gold")', (err) => {
//     if (err) {
//         console.log('ERROR!', err);
//     }
// });

// db.get('SELECT * FROM SEAT_TYPE', (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//         console.log(typeof (result));
//         console.log(result.type);
//     }
// });

db.all('SELECT * FROM USER WHERE user_id=12', (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
        // console.log(result[1].price);
        // console.log(result[2].type);
    }
});


db.close();