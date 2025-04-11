const bcrypt = require('bcrypt');
const farmerModel = require('../models/farmerModel');
const scpModel = require('../models/scpModel');

const farmerRegister = async (req, res) => {
    try {
        const farmer = req.body;

        const farmerUser = await farmerModel.create({
            ...farmer,
        });
        

        return res.status(201).json({
            message: 'Farmer is registered successfully',
            farmerUser
        });
    } catch (err) {
        console.log('farmer Registration Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const allFarmers = async (req, res) => {
    try {
        const farmerUser = await farmerModel.find();        
        return res.status(200).json({   
            message: 'All farmers are fetched successfully',
            farmers: farmerUser
            });
    } catch (error) {
        
    }
}



module.exports = { farmerRegister, allFarmers };
