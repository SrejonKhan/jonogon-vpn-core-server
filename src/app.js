require("dotenv").config();
const server = require("./server");
const https = require("https");
const fs = require("fs");

const port = process.env.PORT;

console.log(
  `
/*
  Long Live Revolution
  Inquilab Zindabad
*/
`
);

const main = () => {
  // https
  if (process.env.NODE_ENV == "production") {
    const options = {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    };
    const httpsServer = https.createServer(options, server);
    httpsServer.listen(port, () => {
      console.log(`Jonogon VPN Root Server is listening on port ${port}.`);
    });
    return;
  }

  // http server
  server.listen(port, () => {
    console.log(`Jonogon VPN Root Server is listening on port ${port}.`);
  });
};

try {
  main();
} catch (ex) {
  console.error(ex);
}
