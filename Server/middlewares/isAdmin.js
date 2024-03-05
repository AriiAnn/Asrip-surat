const { User } = require("../models");

async function isAdmin(req, res, next) {
  try {
    const userId = req.userId; // Ambil userId dari req

    // Log nilai userId
    console.log("userId Value:", userId);

    const user = await User.findByPk(userId);

    // Log nilai isAdmin
    console.log("isAdmin Value:", user ? user.isAdmin : "User not found");

    if (user && user.isAdmin) {
      req.isAdmin = true;
      next();
    } else {
      req.isAdmin = false;
      throw new Error("Anda Bukan Admin!");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = isAdmin;
