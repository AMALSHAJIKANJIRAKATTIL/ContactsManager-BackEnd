const express = require('express');
const userModel = require('../models/user/userModel')
const { body, validationResult } = require('express-validator');
const router = express.Router();
router.use(express.json());
const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken");
const secret = "RESTAPI";

router.post("/resister", body("email").isEmail(),
    body("password").isLength({ min: 5, max: 12 }), async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(403).json({ error: "Please Enter Valid Email and Password" })
            }
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (user) {
                return res.status(403).json({ error: "User already exists" })
            }
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    })
                }
                const data = await userModel.create({
                    email,
                    password: hash
                })
                return res.status(200).json({
                    message: "SignUp Successfully"
                })
            })
        } catch (err) {
            return res.status(400).json({
                status: "Failed",
                message: err.message
            })
        }

    })


module.exports = router;