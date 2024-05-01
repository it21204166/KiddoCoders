const jwt = require("jsonwebtoken");
const jwt_secret = process.env.jwt_secret || 'KiddoCoders'

module.exports = function(req, res, next) {
    try {

        const token = localStorage.getItem('AuthToken');

        console.log("tokentokentokentoken", token)

        const decoded = jwt.verify(token, process.env.jwt_secret);
        if (decoded.userId) {
            req.body.userIdFromToken = decoded.userId;
            next();
        } else {
            return res.send({
                success: false,
                message: "Invalid token",
            });
        }
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};