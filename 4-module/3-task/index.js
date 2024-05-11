function highlight(table) {

  let list = table.querySelectorAll("tr");
  let item = table.querySelectorAll("td");

  let dataAvailable = table.querySelectorAll(
    "tr > td[data-available]"
  );

  for (let rows of list) {
    for (let key of dataAvailable) {
      if (key.dataset.available === "true") {
        key.parentNode.classList.add("available");
      } else {
        key.parentNode.classList.add("unavailable");
      }
    }
    if (!rows.classList.contains("available") &&
      !rows.classList.contains("unavailable")) {
      rows.hidden = true
    }
  };

  for (let key of item) {
    if (key.textContent.includes("m")) {
      key.parentNode.classList.add("male");
    };
    if (key.textContent.includes("f")) {
      key.parentNode.classList.add("female");
    };
    if (key.textContent < 18) {
      key.parentNode.style.textDecoration = 'line-through';
    }
  };
}
