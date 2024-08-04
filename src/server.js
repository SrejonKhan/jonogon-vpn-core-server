const express = require("express");
const cors = require("cors");
const { createVpnProfile } = require("./controllers/vpn.controller");

const server = express();

server.use(cors("*"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post("/api/vpn/create-vpn-profile", createVpnProfile);

server.get("/", (req, res) => {
  res.send(
    `
    Shall we be interested for the Root Server?
    What do we expect here? 
    Shall we say Long Live Revolution?
    `
  );
});

module.exports = server;
