function ucFirst(str) {
  if (str == false) {
    return "";
  };
  let firstUp = str[0].toUpperCase();
  return str = firstUp + str.slice(1);
  
}
