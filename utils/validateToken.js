// module import
const jwt = require("jsonwebtoken");

// function to validate the token
const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token == null) res.status(400).json({ message: "Token not present" });
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).send("Token invalid");
    } else {
      req.params.user = user;
      next(); //proceed to the next action in the calling function
    }
  });
};

module.exports = { validateToken };
