const crypto = require("crypto");
const { sanitizeOrGenerateStr } = require("../utils/file");
const getUuid = require("uuid-by-string");
const path = require("path");

const addOvpnProfile = (reqProfileName, profilePassword, username) => {
  try {
    reqProfileName = sanitizeOrGenerateStr(reqProfileName);

    const serverName = process.env.SERVER_NAME;
    const randomStr = crypto.randomBytes(3).toString("base64url");

    // jonogon-sg1-srejon_device-fse24d
    const ovpnProfileName = `${serverName}-${username}-${reqProfileName}-${randomStr}`;
    const ovpnProfileNameHash = getUuid(ovpnProfileName);

    const command = `MENU_OPTION=1 CLIENT=${ovpnProfileNameHash} PASS=${profilePassword} ./openvpn-install.sh`;
    execSync(command, { stdio: "inherit" });

    const ovpnFilePath = path.join("/root", `${ovpnProfileNameHash}.ovpn`);

    return {
      ovpnFilePath,
      ovpnProfileName,
      ovpnProfileNameHash,
    };
  } catch (error) {
    console.error("Error during OpenVPN installation:", error);
  }
};

module.exports = { addOvpnProfile };