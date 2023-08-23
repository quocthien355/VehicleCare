const jwt_token = require('../helpers/jwt.helper');

exports.isAuth = async (req, res, next) => {
    try {
        // Lấy access token từ cookie
        const token = req.cookies.access_token;
        if (!token) {
            return res.redirect('/auth/login');
        } else {
            // kiểm tra token
            const verified = await jwt_token.verifyToken(
                token,
                process.env.ACCESS_TOKEN_SECRET,
            );
            if (!verified) {
                return res
                    .status(401).redirect('/auth/login');;
            } else {
            // 
                return next();
            }
        }
    } catch (error) {
        console.log(error.message);
        res.redirect('/auth/login')
    }
};
