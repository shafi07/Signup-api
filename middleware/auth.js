const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("token");
	if (!token) res.staus(401).json({ msg: "Auth error" });

	try {
        const decoded = jwt.verify(token,"secret")
        req.user = decoded.user;
        next();
	} catch (e) {
        console.log(e);
        res.status(500).json({msg : "invalid token"});
    }
};
