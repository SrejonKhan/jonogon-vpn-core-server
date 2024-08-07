const express = require("express");
const cors = require("cors");
const { createVpnProfile, removeVpnProfile } = require("./controllers/vpn.controller");
const { verifyServer } = require("./middlewares/auth.middleware");

const server = express();

server.use(cors("*"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post("/api/vpn/create-vpn-profile", verifyServer, createVpnProfile);
server.post("/api/vpn/remove-vpn-profile", verifyServer, removeVpnProfile);

server.get("/", (req, res) => {
  res.send(
    `
    Shall we be interested for the Root Server?
    What do we expect here? 
    Shall we say Long Live Revolution?
    `
  );
});

server.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

module.exports = server;
