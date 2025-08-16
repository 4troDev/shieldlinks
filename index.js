const { isScam, getScamList, addWhitelist } = require("./utils/check");
const { autoUpdate } = require("./utils/update");

module.exports = {
  isScam,
  getScamList,
  autoUpdate,
  addWhitelist, 
};