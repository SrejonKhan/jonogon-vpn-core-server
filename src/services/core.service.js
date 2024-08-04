const crypto = require("crypto");
const { sanitizeOrGenerateStr } = require("../utils/file");
const getUuid = require("uuid-by-string");
const path = require("path");
const fs = require("fs");
const { execSync } = require("node:child_process");

const addOvpnProfile = (reqProfileName, profilePassword, username) => {
  try {
    reqProfileName = sanitizeOrGenerateStr(reqProfileName);

    const serverName = process.env.SERVER_NAME;
    const randomStr = crypto.randomBytes(3).toString("base64url");

    // jonogon-sg1-srejon_device
    const ovpnProfileName = `${serverName}-${username}-${reqProfileName}`;
    const ovpnProfileNameHash = getUuid(ovpnProfileName + randomStr);

    const command = `MENU_OPTION=1 CLIENT=${ovpnProfileNameHash} PASS=${profilePassword} root/openvpn-install.sh`;
    execSync(command, { stdio: "inherit" });

    const ovpnFilePath = path.join("/root", `${ovpnProfileNameHash}.ovpn`);

    const ovpnFileBase64 = fs.readFileSync(ovpnFilePath, { encoding: "base64" });

    return {
      ovpnFilePath,
      ovpnProfileName,
      ovpnProfileNameHash,
      ovpnFileBase64,
    };
  } catch (error) {
    console.error("Error during OpenVPN installation:", error);
  }
};

module.exports = { addOvpnProfile };
