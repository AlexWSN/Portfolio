const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;

function updateSlider() {
  const width = images[0].clientWidth;
  slides.style.transform = `translateX(${-index * width}px)`;
}

next.addEventListener('click', () => {
  index = (index + 1) % images.length;
  updateSlider();
});

prev.addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  updateSlider();
});

window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);

