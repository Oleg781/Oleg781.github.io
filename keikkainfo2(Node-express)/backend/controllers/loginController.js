const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required'});
    }

    try {
        const [user] = await pool.queryBuilder('SELECT * FROM users WHERE email = ?', [email]);
        if ( user.length === 0) {
            return res.status(400).json({ error: 'Incorrect email or password'});
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect email or password'})
        }

        const token = jwt.sign({ user_id: user[0].user_id }, 'salainenAvain', {expiresIn: '1h'});

        res.status(200).json({ message: 'Login successfull', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error while login' });
    }
}

module.exports = { login };