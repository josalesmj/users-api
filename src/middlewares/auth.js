const jwt = require('jsonwebtoken');

const jwtSecret = (process.env.JWT_SECRET || 'secret-shouldnt-be-undefined');

module.exports = function (ctx, next) {
    const authToken = ctx.request.headers.authorization;

    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        let token = bearer[1];

        jwt.verify(token, jwtSecret, function(err, decoded) {
            
            if(err) {
                //return res.status(403).json({ message: 'Token inválido!' });
                //return res.redirect('/token-invalido');
                //err.status = 403;
                throw err;
            }
            else {
                console.log(decoded);
                next();
            }
        });
    }
    else {
        //return res.status(403).json({ message: 'Token inválido!' });
        ctx.status = 403;
        ctx.body = {message: 'Not authorized'}
    }
}