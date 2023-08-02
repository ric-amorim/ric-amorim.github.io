function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}


const slideDuration = 6000; // Set the duration for each slide in milliseconds (8000ms = 8 seconds)
const slide = document.querySelector(".slide");
const slidesList = slide.querySelector("ul");
const slides = slidesList.querySelectorAll("li");
const slideButtons = slide.querySelectorAll("ol li a");
const prevButton = slide.querySelector(".prev");
const nextButton = slide.querySelector(".next");

let currentSlideIndex = 0;
let slideInterval;

function showSlide(index) {
slides.forEach((slide, idx) => {
slide.classList.toggle("selected", idx === index);
});

slideButtons.forEach((button, idx) => {
button.parentElement.classList.toggle("selected", idx === index);
});

const selectedProject = document.querySelector(`#project${index + 1}`);
if (selectedProject) {
selectedProject.scrollIntoView({ behavior: "smooth" });
}
}

function startSlideShow() {
slideInterval = setInterval(() => {
nextSlide();
}, slideDuration);
}

function stopSlideShow() {
clearInterval(slideInterval);
}

slide.addEventListener("mouseover", stopSlideShow);
slide.addEventListener("mouseout", startSlideShow);

function nextSlide() {
currentSlideIndex = (currentSlideIndex + 1) % slides.length;
showSlide(currentSlideIndex);
}

function prevSlide() {
currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
showSlide(currentSlideIndex);
}

slideButtons.forEach((button, idx) => {
button.addEventListener("click", (e) => {
e.preventDefault();
currentSlideIndex = idx;
showSlide(currentSlideIndex);
stopSlideShow();
startSlideShow();
});
});

prevButton.addEventListener("click", () => {
prevSlide();
stopSlideShow();
startSlideShow();
});

nextButton.addEventListener("click", () => {
nextSlide();
stopSlideShow();
startSlideShow();
});

document.addEventListener("keydown", (e) => {
if (e.key === "ArrowLeft") {
prevSlide();
stopSlideShow();
startSlideShow();
} else if (e.key === "ArrowRight") {
nextSlide();
stopSlideShow();
startSlideShow();
}
});

startSlideShow();
