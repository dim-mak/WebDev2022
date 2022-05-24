import express from 'express'
import { engine } from 'express-handlebars';
const app = express()
const router = express.Router();

import { router as adminAddRouter } from './routes/admin_add.mjs';
import { router as adminUpdateRouter } from './routes/admin_update.mjs';
import { router as adminDeleteRouter } from './routes/admin_delete.mjs';
import { router as registerRouter } from './routes/register.mjs';

app.use(express.static('public'));

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

app.use(router); //load the router 'routes' on '/'

app.use('/admin_add', adminAddRouter);
app.use('/admin_update', adminUpdateRouter);
app.use('/admin_delete', adminDeleteRouter);
app.use('/register', registerRouter);

let port = process.env.PORT || '3000';

app.listen(port, () => { console.log("Server open on port  " + port) });

