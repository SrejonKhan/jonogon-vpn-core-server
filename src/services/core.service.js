const crypto = require("crypto");
const { sanitizeOrGenerateStr } = require("../utils/file");
const getUuid = require("uuid-by-string");
const path = require("path");
const fs = require("fs");
const shell = require("shelljs");

const addOvpnProfile = (reqProfileName, username) => {
  try {
    reqProfileName = sanitizeOrGenerateStr(reqProfileName);

    const serverName = process.env.SERVER_NAME;
    const randomStr = crypto.randomBytes(3).toString("base64url");

    // jonogon-sg1-srejon_device
    const ovpnProfileName = `${serverName}-${username}-${reqProfileName}`;
    const ovpnProfileNameHash = getUuid(ovpnProfileName + randomStr);

    // process.env.MENU_OPTION = "1";
    // process.env.CLIENT = ovpnProfileNameHash;
    // process.env.PASS = profilePassword;
    const command = `export MENU_OPTION=1 && export CLIENT=${ovpnProfileNameHash} && export PASS=1 && /root/openvpn-install.sh`;
    shell.exec(command);

    const ovpnFilePath = path.join("/root", `${ovpnProfileNameHash}.ovpn`);

    const ovpnFileBase64 = fs.readFileSync(ovpnFilePath, {
      encoding: "base64",
    });

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
