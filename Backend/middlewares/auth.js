const jwt=require("jsonwebtoken");
const asyncHandler= require("express-async-handler");
const User = require("../models/userModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.headers.authorization;
  console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      user = await User.findById(decoded.userId).select('-password');
      req.userId = user._id;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports= { protect };
