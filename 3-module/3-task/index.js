function camelize(str) {

  let merger = str
    .split("-")
    .filter(item => item !== "")
    .map(item => `${item[0]}`.toUpperCase() + `${item.slice(1)}`)
    .join("");
  if (str[0] !== "-" && str !== "") {
    return merger = merger[0].toLowerCase() + merger.slice(1)
  }
  return merger;
}