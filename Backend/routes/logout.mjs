import express from 'express'
import session from 'express-session'
import { engine } from 'express-handlebars';

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

router.route('/').get(function (req, res) {
    if (req.session) {
        req.session.destroy();
    }

    res.redirect('/')

});


export { router };