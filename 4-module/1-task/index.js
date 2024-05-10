function makeFriendsList(friends) {

  let list = document.createElement('UL');
  let item = document.createElement('LI');

  document.body.append(list);

  for (let obj of friends) {
    list.insertAdjacentHTML(
      'beforeEnd',
      `<li>${obj.firstName + ' ' + obj.lastName}</li>`
    );
  }

  return list
}



