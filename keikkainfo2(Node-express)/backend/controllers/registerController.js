const bcrypt = require('bcrypt');
const pool = require('../db');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [userExists] = await pool.queryBuilder('SELECT * FROM users WHERE email = ?', [email]);
        if (userExists.length > 0) {
            return res.status(400).json({ error: 'User is already in use'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.queryBuilder(
            'ISERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User is created successfully'})
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error while register'});
    }
};

module.exports = { register };