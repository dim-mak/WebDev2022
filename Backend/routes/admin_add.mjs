// import express from 'express'
// import sqlite3 from 'sqlite3'
// import path from 'path';

// const router = express.Router();

// const db = new sqlite3.Database("./../airsky.db", (err) => {
//     if (err) {
//         console.log("Error Occurred - " + err.message);
//     }
//     else {
//         console.log("DataBase Connected admin_add");
//     }
// });

// router.get('/', function (req, res, next) {
//     res.sendFile(path.join(__dirname, '../../../Frontend/admin_add.html'));
// });