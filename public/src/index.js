document.querySelector('#hamburguer').addEventListener('click', () => {
  const menu = document.querySelector('#menu');
  const actived = document.querySelector('.active');
  if (actived) {
    return menu.classList.remove('active');
  }
  menu.classList.add('active');
});
