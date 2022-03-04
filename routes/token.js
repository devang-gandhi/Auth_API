const jwt = require('jsonwebtoken');

module.exports =function(req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denided!');

    try {
        const verifiedtoken = jwt.verify(token, process.env.TOKEN);
        req.user = verifiedtoken;
        next();
    } catch (err) {
        res.status(400).send('Invaild Token');
    }
};