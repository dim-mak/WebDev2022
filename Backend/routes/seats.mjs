import express from 'express'
import { engine } from 'express-handlebars';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from '../db.mjs'


router.route('/').get(function (req, res) {

    db.all("SELECT * FROM SEAT AS S JOIN FLIGHT AS F ON S.flight_id = F.flight_id WHERE F.flight_id = 1 AND occupied = 1", [], function (err, rows) {
        console.log(rows);
    });

    res.render('seats');

});


export { router };