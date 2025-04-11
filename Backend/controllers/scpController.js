const scpModel = require('../models/scpModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const scpRegister = async (req, res) => {
    try {
        const scp = req.body;

        if (!scp.password || !scp.email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingUser = await scpModel.findOne({ email: scp.email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(scp.password, 10);

        const scpUser = await scpModel.create({
            ...scp,
            password: hashedPassword
        });
        const token = jwt.sign({ scpId: scp._id, email: scp.email }, process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );
        res.cookie("token", token)

        return res.status(201).json({
            message: 'SC Partner registered successfully',
            userId: scpUser._id,
            token
        });

    } catch (err) {
        console.error('SCP Registration Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const scpLogin = async (req, res) => {
    try {
        const scp = req.body;
        // Input validation (essential)
        if (!scp.password || !scp.email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const user = await scpModel.findOne({ email: scp.email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid Email or password' });
        }
        const isValidPassword = await bcrypt.compare(scp.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid Email or password' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.cookie("token", token)
        return res.status(200).json({ token: token });

    } catch (error) {
        console.log('SCP Login Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const verify = (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).send('No token');

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        res.status(200).json({ userId: decoded }); 
    } catch (err) {
        console.log(err);
        res.status(401).send('Invalid token');
    }
}

module.exports = { scpRegister, scpLogin, verify };
