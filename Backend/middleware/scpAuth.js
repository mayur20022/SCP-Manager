const jwt = require("jsonwebtoken");


 const scpAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.scpUser = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ msg: "Not authorized" });
    }
}
module.exports = scpAuth;