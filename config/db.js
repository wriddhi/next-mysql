const mysql = require('mysql')
const { resolve } = require('styled-jsx/css')

const pool = mysql.createPool({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

pool.getConnection(function (err, connection) {
    if (err) {
        console.log("Error connecting to db")
    } else {
        console.log("Connected to db with ID : ", connection.threadId)
    }
})

const querySQL = (query, params) => {
    return new Promise((res, rej) => {
        try {
            pool.query(query, params, (err, data) => {
                if(err) {
                    console.log(err)
                    rej(err)
                }
                console.log("Query was executed successfully")
                res(data)
            })
        } catch (err) {
            console.log("Error : ", err)
            rej(err)
        }
    }) 
}

module.exports = { querySQL }