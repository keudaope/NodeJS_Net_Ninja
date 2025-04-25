const fs = require("fs");

const readStream = fs.createReadStream("./docs/blog2.txt", {
  encoding: "utf8",
});

const writeStream = fs.createWriteStream("./docs/blog3.txt");

readStream.on("data", (chunk) => {
  console.log("----- NEW CHUCK -----");
  console.log(chunk);
  writeStream.write("\nNEW CHUNK\n");
  writeStream.write(chunk);
});
