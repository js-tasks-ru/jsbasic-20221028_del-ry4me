function makeFriendsList(friends) {
  // ваш код...
  let ul = document.createElement('ul');

  let i = 0;
  let arr = [];
  while (i < friends.length) {
    let li = document.createElement('li');
    li.textContent = friends[i].firstName + ' ' + friends[i].lastName;
    ul.append(li);
    i += 1;
  }

  return ul;

}

