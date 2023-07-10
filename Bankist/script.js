'use strict';

// Selections
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// add an event listener to all the Open Modal Buttons
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////
// Button Scrolling

btnScrollTo.addEventListener('click', e => {
  // modern smooth-scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});
////////////////////////////////////////

/////////////////////////////////////////
// Event Delegation | Page Navigation
// 1. Add event listener to common parent element

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // 2. In that event listener, determine what element generated the event
  // Matching strategy

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
///////////////////////////////////////////

///////////////////////////////////////////
// Tabbed Component

tabsContainer.addEventListener('click', e => {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  // Guard Clause: an if statement that returns early if some condition is met
  if (!clicked) return;

  // Active Tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Active Content Area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//////////////////////////////////////////////

//////////////////////////////////////////////
// Menu Fade Animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// Fade Away the elements not being hovered over when an element is being hovered over
nav.addEventListener('mouseover', handleHover.bind(0.5));

// Un-fade the rest of the elements once an element is not being hovered over
nav.addEventListener('mouseout', handleHover.bind(1));
//////////////////////////////////////////////

//////////////////////////////////////////////
// Sticky Navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', () =>
//   window.scrollY > initialCoords.top
//     ? nav.classList.add('sticky')
//     : nav.classList.remove('sticky')
// );

// Sticky Navigation: Intersection Observer API
const obsCallback = entries => {
  const [entry] = entries;

  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

//////////////////////////////////////////////

//////////////////////////////////////////////
// Revealing Elements on Scroll
const revealSection = (entries, observer) => {
  const [entry] = entries;

  // Guard Clause
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////////////////////////////////////////

//////////////////////////////////////////////
// Lazy Loading Images
const loadImg = (entries, observer) => {
  const [entry] = entries;

  // Guard Clause
  if (!entry.isIntersecting) return;

  // Replace src attribute with data-src attribute
  entry.target.src = entry.target.dataset.src;

  // Remove the blurry filter class
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////////////////////

//////////////////////////////////////////////
// Slider Component (Arrows and Dots)
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  const slidesLength = slides.length;

  // Function for creating Dot Component
  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class ="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Function for activating Dots
  const activateDot = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide = "${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // Function for changing slides
  const gotoSlide = slide => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );

    // selecting the active dot
    activateDot(slide);
  };

  // Initializing the functions
  const init = () => {
    // Creating the dot elements
    createDots();
    // Activating the first dot element
    activateDot(0);
    // Setting the slide to the first one when page loads
    gotoSlide(0);
  };

  // Calling the init function
  init();

  // Function for changing to the next slide
  const nextSlide = () => {
    currSlide === slidesLength - 1 ? (currSlide = 0) : currSlide++;
    gotoSlide(currSlide);
  };

  // Function for changing to the previous slide
  const prevSlide = () => {
    currSlide === 0 ? (currSlide = slidesLength - 1) : currSlide--;
    gotoSlide(currSlide);
  };

  // Event listener for moving to the next slide on click
  btnRight.addEventListener('click', nextSlide);

  // Event listener for moving to the previous slide on click
  btnLeft.addEventListener('click', prevSlide);

  // Keyboard event listener for moving the next slide
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextSlide();
    // Or Short-Circuiting
    e.key === 'ArrowLeft' && prevSlide();
  });

  // Event listener for changing slides when dots are clicked
  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      // Destructuring the e.target.dataset object
      const { slide } = e.target.dataset;
      gotoSlide(slide);
    }
  });
};

// Calling the slider function
slider();
//////////////////////////////////////////////

//////////////////////////////////////////////
// Lifecycle DOM Events

// 1.
document.addEventListener('DOMContentLoaded', e => {
  console.log('HTML parsed, and DOM Tree built!', e);
});

// 2.
window.addEventListener('load', e => {
  console.log('Page fully loaded!', e);
});

// 3.
// window.addEventListener('beforeunload', e => {
//   // e.preventDefault();
//   console.log('Exiting?', e);
//   e.returnValue = '';
// });
//////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LECTURES

// selecting elements
const footer = document.querySelector('.footer');
const allButtons = document.getElementsByTagName('button');

// creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'Using cookies for improved functionality';
message.innerHTML =
  'Using cookies for improved functionality <button class = "btn btn--close-cookie">Got it</button>';

// add element as the first child
// header.append(message);

// add element as the last child
// it will remove it from the header cos it's now a live element (can't be in 2 places)
// footer.append(message);

// duplicates the element
// header.append(message.cloneNode(true));

// or inserting programmatically

// add element before header
// header.before(message);

// add element after header
// header.after(message);

// deleting elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => message.remove());

// styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// returns the css styles applied on an element
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = `${
  Number.parseFloat(getComputedStyle(message).height, 10) + 30
}px`;

// setting custom property
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes
const logo = document.querySelector('.nav__logo');
logo.alt = 'Beautiful Minimalist Logo';

// non-standard
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// data attributes
console.log(logo.dataset.versionNumber);

// classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Events
const h1 = document.querySelector('h1');
const alertH1 = e => alert('Mouse Entered');

/////////////////////////////////////////////////////////
// Button Scrolling
// get coordinates of the element that's being scrolled to
// const s1coords = section1.getBoundingClientRect();

// scrolling
// window.scrollTo(
//   s1coords.left + window.pageXOffset,
//   s1coords.top + window.pageYOffset
// );

// smooth-scrolling
// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });
////////////////////////////////////////////////////

////////////////////////////////////////////////////
// retro way of adding an event listener
// h1.onmouseenter = e => alert('Mouse Entered');

// current way of adding an event listener
// h1.addEventListener('mouseenter', alertH1);

// using a timeout to remove the event listener
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// event propagation rgb(255,255,255)
/** 
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  // stop event propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
*/
////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
