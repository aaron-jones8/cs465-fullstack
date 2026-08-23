const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = 'travlr-dev-secret-change-me';

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'All fields required' });
    }
    try {
        const user = new User({ name: req.body.name, email: req.body.email });
        await user.setPassword(req.body.password);
        await user.save();
        const token = jwt.sign({ email: user.email, _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(400).json({ message: 'Error registering user', error: err.message });
    }
};

const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Email and password required' });
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isValid = await user.validatePassword(req.body.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ email: user.email, _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

module.exports = { register, login };