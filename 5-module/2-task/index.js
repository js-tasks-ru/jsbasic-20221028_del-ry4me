function toggleText() {
  // ваш код...
  button = document.querySelector('.toggle-text-button');
  text = document.getElementById('text');
  atr = text.attributes;


  button.addEventListener('click', handler);

  function handler() {

    if (!text.hasAttribute('hidden')) {
      text.setAttribute('hidden', true);
    } else {
      text.removeAttribute('hidden');
    }
  }

}
