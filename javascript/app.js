//Setting Up Server
const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.urlencoded({extended: false}));
const PORT = 3000;

//Link the the database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "WebDev287" 
});

//Handles error if database is not properly connected
db.connect((err) => {
        if(err){
            console.log('Error connecting to the database.');
        }else{
            console.log("Connected successfully.");
        }
});

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});