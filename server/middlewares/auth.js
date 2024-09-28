const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
module.exports = async (req, res, next) => {
  try {

    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET,async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "auth failed",
          success: false,
        });
      } else {
        req.body.userId = decoded.id;
        const user = await User.findOne({_id:decoded.id})
        req.user = user
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({
        message: "Failed to authorize {jwt auth middleware}",
        success: false,
      });
  }
};
