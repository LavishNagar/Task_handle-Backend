const jwt=require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: "Authentication token is required" });
    }

    const token = authHeader.split(' ')[1]; // Split the 'Bearer <token>' string

    if (!token) {
        return res.status(401).json({ message: "Authentication token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error('Failed to authenticate token:', err);
        return res.status(401).json({ message: "Invalid token" });
    }
};

