require("dotenv").config();
const server = require("./server");

const port = process.env.PORT;

const main = () => {
  server.listen(port, () => {
    console.log(`Jonogon CDN Server is listening on port ${port}`);
  });
};

try {
  main();
} catch (ex) {
  console.error(ex);
}
