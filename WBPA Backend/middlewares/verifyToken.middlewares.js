import jwt from 'jsonwebtoken';

export const verifyToken = async(req,res,next)=>{
    const token = req.cookies.login_cookie;

    if(!token){
        return res.status(401).json({success: false, message: 'Unauthorised - no token provided'});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decoded;

        if(!decoded){
            return res.status(401).json({success: false, message: 'Unauthorised - no token provided'});
        }

        next();
    } catch (error) {
        console.error('Erro ',error.message);
    }
}