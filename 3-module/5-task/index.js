function getMinMax(str) {
  let allNumbers = str
    .split(" ")
    .map(item => Number(item))
    .filter(item => isFinite(item))
    ;
  let rezult = {
    min: Math.min(...allNumbers),
    max: Math.max(...allNumbers),
  };

  return rezult


}
