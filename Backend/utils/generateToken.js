const jwt= require("jsonwebtoken");

const generateToken = (userId) => {
   return token = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '30d',
  });
};

module.exports= generateToken;
