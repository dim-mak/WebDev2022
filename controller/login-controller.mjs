import bcrypt from 'bcrypt'
import { db } from '../db.mjs'

export let doLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

export let doLogin = function (req, res) {

    let email = req.query.mail;
    let pswd = req.query.pswd;

    db.serialize(() => {
        db.all("SELECT * FROM USER WHERE email = ?", email, function (err, rows) {
            // console.log(rows)
            if (err) {
                console.log(err)
            }
            else if (rows.length > 0) {
                const match = bcrypt.compare(pswd, rows[0].password, (err, match) => {
                    if (err) {
                        console.log(err)
                    }
                    else if (match) {
                        req.session.loggedUserEmail = email;
                        req.session.loggedIsAdmin = rows[0].isAdmin;
                        if (req.session.loggedIsAdmin == true) {
                            res.redirect("/admin_search");
                            console.log("Admin logged in");
                        }
                        else {
                            res.redirect("/");
                            console.log("User logged in");
                        }
                    }
                    else {
                        res.render('login', { alertRender: true })
                    }
                });
            }
            else {
                res.render('login', { alertRender: true })
            }
        })
    })
}

export let showLogInForm = function (req, res) {
    res.render('login');
}

export let checkAuthenticated = function (req, res, next) {
    if (req.session.loggedUserEmail) {
        console.log("User authenticated", req.originalUrl);
        next();
    }
    else {
        console.log("Not authenticated")
        res.redirect('/login');
    }
}

export let checkIsAdmin = function (req, res, next) {
    if (req.session.loggedIsAdmin == true) {
        next();
    }
    else {
        res.redirect('/');
    }
}