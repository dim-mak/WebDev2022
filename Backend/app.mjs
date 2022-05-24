import express from 'express'
import { engine } from 'express-handlebars';
// import { createError } from 'http-errors'
const app = express()
const router = express.Router();

import { router as adminAddRouter } from './routes/admin_add.mjs';

app.use(express.static('public'));

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

// import { db } from './db.mjs'


app.use(router); //load the router 'routes' on '/'

// router.route('/api/tasks').get(listAllTasks);
// router.route('/').get(listAllTasksRender);

// router.route('/toggleTask').get(toggleTask); // new route for toogleTask
// router.route('/deleteTask').get(deleteTask); // new route for deleteTask


app.use('/admin_add', adminAddRouter);



// let userAdded = false;

// router.route('/admin_add').get(function (req, res) {
//     res.render('admin_add', { userAdded: userAdded });
// });

// router.route('/admin_add/add').get(function (req, res) {
//     let alertRender = true;
//     userAdded = true;
//     db.serialize(() => {
//         db.run('INSERT INTO USER(fname,lname,email,gender,street,street_no,city,region,zip_code,country) VALUES(?,?,?,?,?,?,?,?,?,?)',
//             [req.query.fname, req.query.lname, req.query.email, req.query.sex, req.query.street, req.query.street_no,
//             req.query.city, req.query.region, req.query.zip_code, req.query.country], function (err) {
//                 if (err) {
//                     alertRender = false;
//                     return console.log(err.message);
//                 }
//                 console.log("New user added by admin");
//             });
//     });

//     res.render('admin_add', { alertRender: alertRender, userAdded: userAdded });

// });

/* Επίσης έτσι: */
// app.route('/api/tasks').get(listAllTasks);
// app.route('/').get(listAllTasksRender);

let port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Server open on port  " + port) });

