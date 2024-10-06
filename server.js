// Import some dependencies

const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();
const PORT = 8080;

dotenv.config();
//create a connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//Test connection
db.connect((err) =>{
    if(err){
       return console.log("error connecting to mysql",err);
    }

    console.log("connected to mysql as id: ", db.threadId);
})

//endpoint to get patients records
app.get('/patients', (req,res) => {

    const getPatients = "Select patient_id,first_name,last_name, date_of_birth from patients"
    db.query(getPatients,(err, data) =>{
        if(err){
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    })
})

//Endpoint to retrieve providers records
app.get('/providers', (req,res) => {

    const getProviders = "Select first_name,last_name, provider_speciality from providers"
    db.query(getProviders,(err, data) =>{
        if(err){
            return res.status(400).send("Failed to get providers", err)
        }

        res.status(200).send(data)
    })
})

//Endppoint to retrieve patients record by firstname
app.get('/patient_firstName',(req,res)=>{
    const getFirstName = "SELECT * FROM patients where first_name = 'fadel'"
    db.query(getFirstName,(err,data)=>{
        if(err){
            return res.status(400).send("Failed to get FirstNames", err)
        }

        res.status(200).send(data)
    })
})

//Endpoint to retrieve providers by specialty.
app.get('/provider_speciality',(req,res)=>{
    const getprovider_speciality = "SELECT * FROM providers where provider_speciality = 'pediatrics'"
    db.query(getprovider_speciality,(err,data)=>{
        if(err){
            return res.status(400).send("Failed to get providers by provider_speciality", err)
        }

        res.status(200).send(data)
    })
})



app.listen(PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`);
})




