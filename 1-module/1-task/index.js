function factorial(n) {
  let rezult = n
  
  if (!n) {
    return rezult = 1
  };

  for (let i = 1; i < n; i++) {
    rezult = rezult * (n - i);
  };

  return rezult

};
