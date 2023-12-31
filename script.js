function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}


const slideContainer = document.querySelector('.slide ul');
const slideItems = document.querySelectorAll('.slide ul li');
const prevButton = document.querySelector('.slide .prev');
const nextButton = document.querySelector('.slide .next');
const indicators = document.querySelectorAll('.slide ol li a');
let selectedItemIndex = 0;
let touchStartX = 0;
let touchEndX = 0;


function moveToSelectedSlide(index) {
  selectedItemIndex = index;
  const selectedProject = document.querySelector(`#project${selectedItemIndex + 1}`);
  selectedProject.scrollIntoView({
    behavior: 'auto',
    block: 'nearest',
  });

  //Remove the class "selected" of all the projects
  slideItems.forEach((item) => item.classList.remove('selected'));

  //Add the class "selected" to the selected project
  slideItems[selectedItemIndex].classList.add('selected');

  updateArrowVisibility();
  updateIndicatorVisibility();
}

function updateArrowVisibility() {
  prevButton.disabled = selectedItemIndex === 0;
  nextButton.disabled = selectedItemIndex === slideItems.length - 1;
}

function updateIndicatorVisibility() {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('selected', index === selectedItemIndex);
    indicator.style.backgroundColor = index === selectedItemIndex ? '#333' : '#fff';
  });
}

prevButton.addEventListener('click', () => {
  if (selectedItemIndex > 0) {
    moveToSelectedSlide(selectedItemIndex - 1);
  } else {
    moveToSelectedSlide(slideItems.length - 1); // go back to the 1º project
  }
});

nextButton.addEventListener('click', () => {
  if (selectedItemIndex < slideItems.length - 1) {
    moveToSelectedSlide(selectedItemIndex + 1);
  } else {
    moveToSelectedSlide(0);  
  }
});

slideItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    moveToSelectedSlide(index);
  });
});
slideContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

slideContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  const swipeDistance = touchEndX - touchStartX;
  const threshold = 50; // Adjust the threshold as needed

  if (swipeDistance > threshold && selectedItemIndex > 0) {
    moveToSelectedSlide(selectedItemIndex - 1);
  } else if (swipeDistance < -threshold && selectedItemIndex < slideItems.length - 1) {
    moveToSelectedSlide(selectedItemIndex + 1);
  }
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    moveToSelectedSlide(index);
  });
});

updateArrowVisibility();
updateIndicatorVisibility();
