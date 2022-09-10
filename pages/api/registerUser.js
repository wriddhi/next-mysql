import { querySQL } from "../../config/db"

const bcrypt = require('bcrypt')

export default function handler(req, res) {
  const userData = req.body

  const newUser = async() => {
    const query = `SELECT * FROM test WHERE email = '${userData.email}';`
    const results = await querySQL(query, [])
    if(results.length) {
      return false
    } else {
      return true
    }
  }

  const insert = async() => {
    
    const newuser = await newUser()

    let hashedPassword
    try {
      const salt = await bcrypt.genSalt()
      hashedPassword = await bcrypt.hash(userData.password, salt)
    } catch(err) {
      res.status(500).json(err)
    }

    if(!newuser) {
      res.status(400).json("User with said email already exists !")
      return
    }

    const query = `INSERT INTO test VALUES (NULL, "${userData.name}", "${userData.email}", "${hashedPassword}");`
    await querySQL(query, [])
    res.status(200).json("Your account was successfully registered")
  }

  insert()
}