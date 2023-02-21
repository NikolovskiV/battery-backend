const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/signup", async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body;

        //Validation

        if (!email || !password || !passwordVerify)
            return res.status(400).json({ errorMessage: "Invalid email or password" });

        if (password.length < 6)
            return res.status(400).json({ errorMessage: "Password needs at least 6 characters" });

        if (password !== passwordVerify)
            return res.status(400).json({ errorMessage: "Please enter the same password twice" });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ errorMessage: "This email already exists" });

        //Bcrypted Password

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //Save

        const newUser = new User({
            email, passwordHash
        });

        const savedUser = await newUser.save();

        //Token

        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET);


        //Send the token Cookie to store password
        res.cookie("token", token, {
            httpOnly: true,
        }).send();

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ errorMessage: "Invalid email or password" });

        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(401).json({ errorMessage: "Wrong Email or Password" });

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect)
            return res.status(401).json({ errorMessage: "Wrong Email or Password" });

        const token = jwt.sign({
            user: existingUser._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
        }).send();

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
});

router.get("/loggedIn", (req, res) => {

    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);

    } catch (err) {
        res.json(false);
    }

})



module.exports = router;