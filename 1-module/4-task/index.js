function checkSpam(str) {
  let strUp = str.toUpperCase();
  
   if (strUp.indexOf('1XBET') != -1 || strUp.indexOf('XXX') != -1){
     return true
   } else {
     return false
   }
}



