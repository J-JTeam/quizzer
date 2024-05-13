const express = require('express');
const User = require("../Models/User");
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body; // Destructure username and password from request body
    try {
        const loggedUser = await User.findOne({ username, password });

        if (!loggedUser) return res.status(404).json({ message: 'No User Found' });

        return res.status(200).json(loggedUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body; // Destructure username, email, and password from request body
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        return res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/test',(req,res)=>{

    res.send('works')
})
module.exports = router;
