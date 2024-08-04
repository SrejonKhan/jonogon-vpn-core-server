const jwt = require("jsonwebtoken");
const { addOvpnProfile } = require("../services/core.service");
const API_SERVER_RSA_PUBLIC_KEY = Buffer.from(process.env.API_SERVER_RSA_PUBLIC_KEY, "utf-8").toString();

const createVpnProfile = async (req, res, next) => {
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

    /* Create VPN Profile & Upload to CDN */
    const { profileName, profilePassword, username } = req.body;
    const { ovpnFilePath, ovpnProfileName, ovpnProfileNameHash, ovpnFileBase64 } = addOvpnProfile(
      profileName,
      profilePassword,
      username
    );

    const body = {
      ovpnFilePath,
      ovpnProfileName,
      ovpnProfileNameHash,
      ovpnFileBase64,
    };
    res.status(200).json(body);
  } catch (ex) {
    next(ex);
  }
};

module.exports = { createVpnProfile };
