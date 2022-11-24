const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database:"beproject",
});

app.post("/server", (req,res)=>{
    db.query("insert into users(username, password) values('u1','p1');",(err, result)=>{
        res.send("hehe boy");
    })
    res.redirect('/home')
})

app.listen(3000, () => {
    console.log('running on 3000');
})