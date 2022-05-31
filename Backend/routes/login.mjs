import express from 'express'
import { engine } from 'express-handlebars';
import * as logInController from '../controller/login-controller.mjs'

const app = express()
const router = express.Router();

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');


router.route('/').get(logInController.showLogInForm)

router.route('/data').get(logInController.doLogin)

export { router };