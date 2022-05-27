import express from 'express'
import { engine } from 'express-handlebars';

const app = express()
const router = express.Router();

import { db } from '../db.mjs'


app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');


router.route('/').get(function (req, res) {
    let departAirports = [];
    let destinationAirports = [];


    db.all("SELECT depart_airport FROM FLIGHT", function (err, rows) {
        // console.log(rows);
        let temp = [];

        for (let i of rows) {
            if (temp.includes(i.depart_airport) === false) {
                departAirports.push({ "depart": i.depart_airport });
                temp.push(i.depart_airport);
            }
        }

        // console.log(departAirports);

    });


    db.all("SELECT dest_airport FROM FLIGHT", function (err, rows) {
        let temp = [];
        // console.log(rows);

        for (let i of rows) {
            if (temp.includes(i.dest_airport) === false) {
                destinationAirports.push({ "destination": i.dest_airport });
                temp.push(i.dest_airport);
            }
        }

        // console.log(destinationAirports);

    });

    res.render('search', { departAirports, destinationAirports: departAirports, destinationAirports });
});

router.route('/view').get(function (req, res) {


    let searchData = req.query;
    // console.log(searchData);

    exportData(searchData);

});

let data;
function exportData(searchData) {
    // console.log(searchData);
    data = searchData;
    // console.log(data);
}


export { router };
export { data };
