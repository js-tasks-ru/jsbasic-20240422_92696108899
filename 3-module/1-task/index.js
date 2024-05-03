const { runner } = require("karma")

function namify(users) {
  let userNames = users.map(item => item.name);
  return userNames;
}
