import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) =>{
    try {
        const {token} = req.headers;
        if(!token) return res.status(401).json({message: 'Unauthorized User'});

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PSWD){
            return res.status(401).json({
                msg:"User not authorizes",
                success:false
            });
        };
        next();
    } catch (error) {
        console.log(error);
    }
};
export default adminAuth;