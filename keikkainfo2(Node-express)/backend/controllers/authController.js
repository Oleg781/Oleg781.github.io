// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');  // Tarkista, että tämä on oikein

exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    // Tarkista, onko käyttäjänimi jo käytössä
    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    try {
        const [id] = await db('users').insert({ username, email, password: hash });
        res.status(201).json({ id, username });
    } catch (err) {
        console.error('Rekisteröintivirhe:', err);
        res.status(400).json({ error: err.message || 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await db('users').where({ username }).first();

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token });
};
