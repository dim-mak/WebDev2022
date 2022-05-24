import express from 'express'
import { engine } from 'express-handlebars';
// import { createError } from 'http-errors'
const app = express()
const router = express.Router();

// import { router as adminAddRoute } from './routes/admin_add';

app.use(express.static('public'));

app.engine('hbs', engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

import { db } from './db.mjs'

// let tasks = [
//     { "id": 1, "task": "Να βρω σφάλματα", "status": 0, "created_at": "2022-05-07 09:08:10" },
//     { "id": 2, "task": "Να ξαναδώ τον κώδικα", "status": 0, "created_at": "2022-05-10 23:50:40" },
//     { "id": 3, "task": "Να διορθώσω τα σφάλματα", "status": 1, "created_at": "2022-05-10 23:50:40" },
//     { "id": 4, "task": "Να αναμορφώσω τον κώδικα", "status": 1, "created_at": "2022-05-10 23:50:40" },
//     { "id": 5, "task": "Να πάω για μπύρες", "status": 1, "created_at": "2022-05-10 23:50:50" }
// ];

// let getAllTasks = function (callback) {
//     callback(null, tasks);
// };

// let getTaskById = function (taskId, callback) {
//     let task = { "id": taskId, "task": "Να βρω σφάλματα", "status": 1, "created_at": "2022-05-07 09:08:10" };
//     callback(null, task);
// };


// let listAllTasks = function (req, res) {
//     getAllTasks(function (err, tasks) {
//         if (err) {
//             res.send(err);
//         }
//         // console.log('res', tasks);
//         res.send(tasks);//στέλνει το object
//     });
// };

// //Απαντάει σε αίτημα για συγκεκριμένο task
// let listSingleTask = function (req, res) {
//     getTaskById(req.params.taskId, function (err, task) {
//         if (err) {
//             res.send(err);
//         }
//         // console.log('res', task);
//         res.send(task);//στέλνει το object
//     });
// }

// //Δημιουργεί την σελίδα που φορτώνεται την 1η φορά στον φυλλομετρητή 
// let listAllTasksRender = function (req, res) {
//     getAllTasks(function (err, tasks) {
//         if (err) {
//             res.send(err);
//         }
//         // console.log('tasks', tasks);
//         // στέλνει το object tasks στο template "tasks-classic"
//         res.render('tasks-classic', { tasks: tasks });
//     });
// }


// let toggleTask = function (req, res) {
//     let taskId = req.query.taskId;
//     console.log("Clicked task no" + taskId);
//     for (let i in tasks) {
//         if (tasks[i].id == taskId) {
//             if (tasks[i].status == 1) {
//                 tasks[i].status = 0;
//                 console.log("status set to 0");
//             } else {
//                 tasks[i].status = 1;
//                 console.log("status set to 1");
//             }
//         }
//     }

//     res.render('tasks-classic', { tasks: tasks });
// }

// let deleteTask = function (req, res) {
//     let taskId = req.query.taskId;
//     console.log("Clicked task no" + taskId);

//     for (let i in tasks) {
//         if (tasks[i].id == taskId) {
//             tasks.splice(i, 1);
//             console.log("Task deleted")
//         }
//     }

//     res.render('tasks-classic', { tasks: tasks });
// }

// let addTask = function (req, res) {
//     let now = new Date();
//     let nowDate = getDate(now);
//     let nowTime = getTime(now);

//     let newTask = { "id": tasks.length + 1, "task": req.query.taskName, "status": 0, "created_at": nowDate + " " + nowTime }
//     console.log(req.query.task);

//     tasks.push(newTask);

//     res.render('tasks-classic', { tasks: tasks });
// }

// function getDate(date) {
//     let dd = date.getDate();
//     let mm = date.getMonth() + 1; //January is 0 so +1 is needed
//     let yyyy = date.getFullYear();
//     if (dd < 10) {
//         dd = '0' + dd
//     }
//     if (mm < 10) {
//         mm = '0' + mm
//     }

//     let transDate = yyyy + '-' + mm + '-' + dd;

//     return transDate
// }

// function getTime(date) {
//     let hh = date.getHours();
//     let mm = date.getMinutes();
//     let ss = date.getSeconds();

//     let transDate = hh + ':' + mm + ':' + ss;

//     return transDate
// }

/* Χρησιμοποίησε τις διαδρομές που υπάρχουν στο  router */
app.use(router); //load the router 'routes' on '/'

// router.route('/api/tasks').get(listAllTasks);
// router.route('/').get(listAllTasksRender);

// router.route('/toggleTask').get(toggleTask); // new route for toogleTask
// router.route('/deleteTask').get(deleteTask); // new route for deleteTask
// router.route('/addTask').get(addTask); // new route for addTask


router.route('/admin_add').get(function (req, res) {

    res.render('admin_add');
    console.log(req.query.fname);

    db.serialize(() => {
        db.run('INSERT INTO USER(fname,lname,email,gender,street,street_no,city,region,zip_code,country) VALUES(?,?,?,?,?,?,?,?,?,?)',
            [req.body.fname, req.body.lname, req.body.email, req.body.sex, req.body.street, req.body.street_no,
            req.body.city, req.body.region, req.body.zip_code, req.body.country], function (err) {
                if (err) {
                    res.send("Error encountered while adding");
                    return console.log(err.message);
                }
                console.log("New user added by admin");
                res.send("New user added by admin to database with email = " + req.body.email + " and name = " + req.body.fname + " " + req.body.lname);
            });
    });


});

/* Επίσης έτσι: */
// app.route('/api/tasks').get(listAllTasks);
// app.route('/').get(listAllTasksRender);

let port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Server open on port  " + port) });

