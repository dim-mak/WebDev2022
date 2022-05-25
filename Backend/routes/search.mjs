import express from 'express'
import { engine } from 'express-handlebars';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');


router.route('/').get(function (req, res) {
    res.render('search');
});

router.route('/view').get(function (req, res) {


    let searchData = req.query;
    // console.log(searchData);

    sendData(searchData);

});

let data;
function sendData(searchData) {
    // console.log(searchData);
    data = searchData;
    console.log(data);
    return searchData;
}


export { router };
export { data };
