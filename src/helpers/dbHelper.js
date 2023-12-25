const {createPool} = require('mysql2');
const dotenv = require('dotenv');
const { query } = require('express');

dotenv.config();
const pool =  createPool({
    host:process.env.SERVER,
    user:process.env.NAME,
    password:process.env.PASSWORD,
    database:process.env.DBNAME,
    connectionLimit:20
})
const dbHelper = (sql,parametre) =>{
    return new Promise((resolve, reject)=>{
        pool.query(sql, parametre, (err, result, fields)=>{
            if(err){
                console.log(err)
                reject(new Error(err.message));
            }
                resolve(result);
        })
    })
       
}

module.exports = {pool, dbHelper};