require("dotenv").config();
const server = require("./server");

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
  server.listen(port, () => {
    console.log(`Jonogon VPN Root Server is listening on port ${port}.`);
  });
};

try {
  main();
} catch (ex) {
  console.error(ex);
}
