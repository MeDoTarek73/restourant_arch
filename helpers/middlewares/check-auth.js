const jwt = require('jsonwebtoken');
module.exports = async(req, res, next) => {
    try {
        if (req.headers['authorization']) {
            const token = req.headers['authorization'].split('Bearer ')[1];
            jwt.verify(token, process.env.PRIVATEKEY, { expiresIn: '24h' }, async(err, decoded) => {
                if (err) {
                    return res.status(401).send("Unauthorized access - Invalid Token");
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else
            return res.status(403).send("A token is required for authentication");
    } catch (err) {
        return res.status(401).send('Unauthorized access - Invalid Token')
    }
}