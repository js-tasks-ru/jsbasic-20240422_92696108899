function makeFriendsList(friends) {

  let list = document.createElement('UL');

  document.body.append(list);

  for (let obj of friends) {
    list.insertAdjacentHTML(
      'beforeEnd',
      `<li>${obj.firstName + ' ' + obj.lastName}</li>`
    );
  }

  return list
}



