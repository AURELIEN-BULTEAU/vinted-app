const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  // ET on peut maintenant rechercher dans la base de données un utilisateur qui possède ce token
  const userFound = await User.findOne({ token: token });

  if (userFound) {
    req.user = userFound;

    next();
  } else {
    res.status(404).json("Unauthorized");
  }
};

module.exports = isAuthenticated;
