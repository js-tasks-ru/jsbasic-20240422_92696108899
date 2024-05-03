const { runner } = require("karma")

function namify(users) {
  let userNames = users.map(item => item.name);
  return userNames;
}
/*       let userNames = (users.map( (item, index) => item.name ));
      return userNames; 


      `${item.name}`
      
      
      
      
      
      */