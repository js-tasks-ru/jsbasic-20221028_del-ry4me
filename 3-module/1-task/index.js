function namify(users) {
  // ваш код...
  let result = [];
  for (const item of users) {
    result.push(item.name);
  }
  return result;
}
