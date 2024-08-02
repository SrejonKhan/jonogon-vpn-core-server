const express = require("express");
var cors = require("cors");

const server = express();
server.use(cors("*"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send(
    `<h2>Shall we be interested for the CDN? What do we expect here? It's not a typical CDN server with stuff that you wish to see. But, it's written with what?</h2>`
  );
});

module.exports = server;
