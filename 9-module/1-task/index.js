export default function promiseClick(button) {
  // ваш код...
  return new Promise(function(resolve, reject) {
    button.addEventListener('click', (event) => {resolve(event);}, {once: true});});

}
