import sqlite3 from 'sqlite3'

const db = new sqlite3.Database("./airsky.db", (err) => {
    if (err) {
        console.log("Error Occurred - " + err.message);
    }
    else {
        console.log("DataBase Connected");
    }
});

export { db }