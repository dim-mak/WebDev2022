import express from 'express'
import { engine } from 'express-handlebars';

const app = express()
const router = express.Router();

import { db } from '../db.mjs'

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

router.route('/').get(function (req, res) {

    res.render('admin_search', { alertRender: false });

});


router.route('/view').get(function (req, res) {

    db.all("SELECT email FROM USER WHERE email = ? ", req.query.user_email, function (err, rows) {
        console.log(rows);

        if (rows && rows.length > 0) {
            let searchData = req.query;
            exportData(searchData);
            res.redirect('/admin_results');
        } else {
            res.render('admin_search', { alertRender: true });
        }
    })
});

let adminData;
function exportData(searchData) {
    data = searchData;

}


export { router };
export { adminData };
