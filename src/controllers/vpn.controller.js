const { addOvpnProfile, removeOvpnProfile } = require("../services/core.service");

const createVpnProfile = async (req, res, next) => {
  try {
    /* Create VPN Profile & Upload to CDN */
    const { profileName, username } = req.body;
    const { ovpnFilePath, ovpnProfileName, ovpnProfileNameHash, ovpnFileBase64 } = addOvpnProfile(profileName, username);

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

const removeVpnProfile = async (req, res, next) => {
  try {
    /* Remove VPN Profile */
    const { profileName } = req.body;
    const { status, message } = removeOvpnProfile(profileName);

    const body = {
      message,
    };
    res.status(status == "client_error" ? 400 : 200).json(body);
  } catch (ex) {
    next(ex);
  }
};

module.exports = { createVpnProfile, removeVpnProfile };
