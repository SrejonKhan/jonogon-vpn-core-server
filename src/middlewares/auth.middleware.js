const jwt = require("jsonwebtoken");
const API_SERVER_RSA_PUBLIC_KEY = Buffer.from(process.env.API_SERVER_RSA_PUBLIC_KEY, "utf-8").toString();

const verifyServer = async (req, res, next) => {
  try {
    /* 
    This little authentication is enough even if the the infra server's API is exposed publicly somehow.
    No one can't generate a token without RSA_PRIVATE_KEY.
    Even if they generate and try, it will fail in verification. 
  */
    if (!req.header("ServerAuthorization")) {
      return res.status(400).json("Server Authorization is Required!");
    }
    if (req.header("ServerAuthorization").split(" ").length < 2) {
      return res.status(400).json("Invalid Server Authorization header!");
    }
    const serverCred = jwt.verify(req.header("ServerAuthorization").split(" ")[1], API_SERVER_RSA_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    if (serverCred.serverPassKey != "Inquilab_Zindabad") {
      return res.status(400).json("Very Clever?");
    }
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = { verifyServer };
