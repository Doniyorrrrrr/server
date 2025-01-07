const fs = require("fs");

function readFile(fileName) {
  try {
    return JSON.parse(fs.readFileSync(`./dataBase/${fileName}`, "utf-8"));
  } catch (error) {
    throw new Error("reading is error");
  }
}
function writeFile(fileName, newFile) {
  try {
    fs.writeFileSync(
      `./dataBase/${fileName}`,
      JSON.stringify(newFile, null, 4)
    );
  } catch (error) {
    throw new Error("writing is error");
  }
}
module.exports = {writeFile,readFile}