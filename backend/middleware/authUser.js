import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const token = req.headers.token; // ✅ Extracting token from `req.headers.token`

    if (!token) {
        return res.status(401).json({ msg: "Login required to access this resource", success: false });
    }

    try {
        const token_decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!token_decoded) {
            return res.status(401).json({ msg: "Invalid token", success: false });
        }
        req.userId = token_decoded.userId; // ✅ Attach user ID to request
        console.log("✅ Authenticated userId:", req.userId);
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid or expired token", success: false });
    }
};

export default authUser;
