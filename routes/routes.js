const express = require("express");
const router = express.Router();
const signUpTables = require('../models/userModel')
const bcrypt = require('bcrypt');

router.post('/connect', async (req, res) => {

    const saltPassword = await bcrypt.genSalt(1)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    const signedUpUser = new signUpTables({
        email: req.body.email,
        password: securePassword
    })
    signedUpUser.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})




module.exports = router