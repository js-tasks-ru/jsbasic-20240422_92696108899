function sumSalary(salaries) {
  let summ = 0
  for (let key in salaries) {
    if ( typeof (salaries[key] == Number) 
          && isFinite( salaries[key] ) ){
      summ = summ + salaries[key]
    };
  }
  return summ;


}


