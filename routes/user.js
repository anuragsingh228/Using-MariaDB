const { v4: uuidv4 } = require('uuid');
const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require('../helpers/database');
const router = express.Router();

router.get('/:id', async function(req, res) {
    try {
        const sqlQuery = 'SELECT id, email FROM user WHERE id =?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
    res.status(200).json({id:req.params.id})
})

router.post('/signup', async(req, res) => {
    const { email, password, phone } = req.body;
    try {
        const sqlQuery = 'SELECT id, email FROM user WHERE email =?';
        const rows = await pool.query(sqlQuery, email);
      if (rows.length===2) {
        return res
          .status(404)
          .json({ errors: [{ msg: "User already exists" }] });
      }else{   
        const newuser = {
            email,
            password,
            phone
        };
        console.log(newuser);
        bcrypt.genSalt(10,  (err, salt) => {
            bcrypt.hash(newuser.password, salt, async (err, hash) => {
            if (err) throw err;
            newuser.password = hash;
            const sqlQueryInsert = 'INSERT INTO user ( email, password, phone) VALUES (?,?,?)';
            const sqlQuery = 'SELECT id, email, phone FROM user WHERE id =?';
            const result = await pool.query(sqlQueryInsert, [ newuser.email, newuser.password, newuser.phone]);
            const send = await pool.query(sqlQuery, result.insertId);


            res.status(200).json(send);
            });
        });
      }
    } catch (err) {
        console.log(err);
      return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  
})

module.exports = router;