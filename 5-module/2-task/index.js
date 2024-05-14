function toggleText() {
  
  btnToggle = document.querySelector('.toggle-text-button');
  textHide = document.querySelector('#text');
  
  btnToggle.addEventListener('click', () => {
    textHide.hasAttribute('hidden') ? textHide.hidden = false : textHide.hidden = true
  }
  )
};