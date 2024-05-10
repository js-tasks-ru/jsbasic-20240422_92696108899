function makeDiagonalRed(table) {
  
    let tableRow = table.querySelectorAll('tr');
    let tableData = table.querySelectorAll('td');

    for (let i = 0; i < tableData.length; i += (tableRow.length + 1) ) {
        tableData[i].style.backgroundColor = 'red';
    }

  
}


