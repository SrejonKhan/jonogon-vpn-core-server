const crypto = require("crypto");
const { sanitizeStr } = require("../utils/file");
const getUuid = require("uuid-by-string");
const path = require("path");
const fs = require("fs");
const shell = require("shelljs");

const addOvpnProfile = (reqProfileName, username) => {
  reqProfileName = sanitizeStr(reqProfileName);

  const serverName = process.env.SERVER_NAME;
  const randomStr = crypto.randomBytes(3).toString("base64url");

  // jonogon-sg1-srejon_device
  const ovpnProfileName = `${serverName}-${username}-${reqProfileName}`;
  const ovpnProfileNameHash = getUuid(ovpnProfileName + randomStr);

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
};

const removeOvpnProfile = (profileName) => {
  // check if profile exist
  const profileExistanceCmd = $`tail -n +2 /etc/openvpn/easy-rsa/pki/index.txt | grep "^V" | cut -d '=' -f 2 | grep -w "${profileName}"`;
  if (shell.exec(profileExistanceCmd).stdout != profileName) {
    return {
      status: "client_error",
      msg: "Profile doesn't exist in the VPN Server.",
    };
  }

  shell.cd("/etc/openvpn/easy-rsa/");
  shell.exec(`./easyrsa --batch revoke "${profileName}"`);
  shell.exec(`EASYRSA_CRL_DAYS=3650 ./easyrsa gen-crl`);
  shell.exec("rm -f /etc/openvpn/crl.pem");
  shell.exec("cp /etc/openvpn/easy-rsa/pki/crl.pem /etc/openvpn/crl.pem");
  shell.exec("chmod 644 /etc/openvpn/crl.pem");
  shell.exec(`find /home/ -maxdepth 2 -name "${profileName}.ovpn" -delete`);
  shell.exec(`rm -f "/root/${profileName}.ovpn"`);
  shell.exec(`sed -i "/^${profileName},.*/d" /etc/openvpn/ipp.txt`);
  shell.exec(`cp /etc/openvpn/easy-rsa/pki/index.txt{,.bk}`);

  return {
    status: "success",
    msg: "Profile successfully from the the VPN Server.",
  };
};

module.exports = { addOvpnProfile, removeOvpnProfile };
