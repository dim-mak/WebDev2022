import express from 'express'
import { engine } from 'express-handlebars';
import session from 'express-session'
const app = express()
const router = express.Router();

import * as logInController from './controller/login-controller.mjs'

import { router as adminAddRouter } from './routes/admin_add.mjs';
import { router as adminSearchRouter } from './routes/admin_search.mjs';
import { router as adminResultsRouter } from './routes/admin_results.mjs';
import { router as adminDeleteRouter } from './routes/admin_delete.mjs';
import { router as adminViewFlightsRouter } from './routes/admin_view_flights.mjs';
import { router as registerRouter } from './routes/register.mjs';
import { router as profileRouter } from './routes/profile.mjs';
import { router as searchRouter } from './routes/search.mjs';
import { router as resultsRouter } from './routes/results.mjs';
import { router as seatsRouter } from './routes/seats.mjs';
import { router as seatsBackRouter } from './routes/seats_back.mjs';
import { router as termsRouter } from './routes/terms_of_use.mjs';
import { router as policyRouter } from './routes/private_data_policy.mjs';
import { router as paymentRouter } from './routes/payment_methods.mjs';
import { router as aboutUsRouter } from './routes/about_us.mjs';
import { router as checkoutRouter } from './routes/checkout.mjs';
import { router as finalRouter } from './routes/final.mjs';
import { router as forgotPswdRouter } from './routes/forgot_pswd.mjs';
import { router as loginRouter } from './routes/login.mjs';
import { router as logoutRouter } from './routes/logout.mjs';
import { router as ticketsRouter } from './routes/tickets.mjs';


app.use(session({
    name: 'airskySession',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        sameSite: true,
    }
}));

app.use((req, res, next) => {
    res.locals.userEmail = req.session.loggedUserEmail;
    res.locals.isAdmin = req.session.loggedIsAdmin;
    next();
})

app.use(express.static('public'));

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

app.use(router);

app.use('/admin_add', logInController.checkAuthenticated, logInController.checkIsAdmin, adminAddRouter);
app.use('/admin_search', logInController.checkAuthenticated, logInController.checkIsAdmin, adminSearchRouter);
app.use('/admin_results', logInController.checkAuthenticated, logInController.checkIsAdmin, adminResultsRouter);
app.use('/admin_delete', logInController.checkAuthenticated, logInController.checkIsAdmin, adminDeleteRouter);
app.use('/admin_view_flights', logInController.checkAuthenticated, logInController.checkIsAdmin, adminViewFlightsRouter);
app.use('/register', registerRouter);
app.use('/profile', logInController.checkAuthenticated, profileRouter);
app.use('/', searchRouter);
app.use('/results', resultsRouter);
app.use('/seats', logInController.checkAuthenticated, seatsRouter);
app.use('/seats_back', logInController.checkAuthenticated, seatsBackRouter);
app.use('/terms_of_use', termsRouter);
app.use('/private_data_policy', policyRouter);
app.use('/payment_methods', paymentRouter);
app.use('/about_us', aboutUsRouter);
app.use('/checkout', logInController.checkAuthenticated, checkoutRouter);
app.use('/final', logInController.checkAuthenticated, finalRouter);
app.use('/forgot', forgotPswdRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/tickets', logInController.checkAuthenticated, ticketsRouter);

let port = process.env.PORT || '3000';

app.listen(port, () => { console.log("Server open on port  " + port) });

