'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Implementing Smooth Sroll for Learn More Button:

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  // const s1cords = section1.getBoundingClientRect(); // gives the detail of the section or area where we need to scroll

  // console.log(s1cords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current sroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth); // Viewing ViewPort height and width....

  // Scrolling: OLD WAY
  // s1cords is related to getBoundingClientRect() which gives the distance between the viewport and section but not from the top of the page to section. So, to scroll to the section exactly we need the distance between the viewport and section(s1cords.left, s1cords.top) and also the srolled distance between the pageStart to viewport(window.pageXOffset gives scrolled distance from left of screen to left viewport or scrolled distance from right of screen to right viewPort.  Similarly, pageYOffset gives srolled distance form top to viewPort or bottom to viewPort). So, exact distance would be s1.cords.top(Top distance from viewport to section to scroll) + window.pageYOffset(Top distance from page to viewport).

  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   s1cords.top + window.pageYOffset
  // );

  // Smooth Scrolling: OLD WAY
  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // New Way smooth scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Page Navigation:

// Below way of smooth scrolling is ok for small quantity of elements for example 3 in below, but when the quantity increases, this becomes inefficient as we continuosly create and assign the same call back function to all the elements.
// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Better way is to use Event Delegation:
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // class '.nav__links' is common parent element.
  e.preventDefault();

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    // e.target originated the event.
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DOM TRAVERSAL
const h1 = document.querySelector('h1');

/* Remember: querySelector() or querySelectorAll() will select the node whether child or parent regardless of how deep the child/childNode is or how up the parent/parentNode is. But in the case of closest(), it will select the closest child/childNode or closest parent/parentNode. */

// Going Downwards: child

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); // returns a nodeList containing all the childNodes of h1.
console.log(h1.children); // returns a live collection.
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// Going Upwards: Parent
console.log(h1.parentNode);
console.log(h1.parentElement); // Returns the direct parent element.
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // Returns the closest whatever is mentioned in the parameter of closest(). That parameter can be a className, id, Element, Node, ...etc.
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going Sideways: Siblings(Always exist at same level)

// To get the next or previous Sibling..
console.log(h1.previousElementSibling); // Returns the Element which is present just before the h1 element on same level.
console.log(h1.nextElementSibling); // Returns the Element which is present just after the h1 element on same level.
console.log(h1.previousSibling); // Returns the node which is present just before the h1 element on same level.
console.log(h1.nextSibling); // Returns the node which is present just after the h1 element on same level.

// To get all the siblings for an element like h1.
console.log(h1.parentElement.children); // Returns all the siblings of h1 element in form of live collection. By collection means it is iterable and indeed it we could spread it in array and iterate over it.

// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Tabbed Components

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// console.log(tabsContainer.childNodes);
// console.log(tabsContainer.children);

// Using Event Delegation to attach event Handler to tabs...
tabsContainer.addEventListener('click', e => {
  // Matching Strategy
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // Removing active tab from all tabs.
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  // Activating the clicked tab.
  clicked.classList.add('operations__tab--active');

  // Displaying the content for the clicked tab..

  // Removing active content from all contents.
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  // Activating the content for the clicked tab.
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menu Fading..

const nav = document.querySelector('.nav');
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    console.log(this);
    const linkClicked = e.target;
    const linkSiblings = linkClicked
      .closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = linkClicked.closest('.nav').querySelector('img');

    linkSiblings.forEach(el => {
      if (el !== linkClicked) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// Normal way of calling handleHover function inside the callBack function of the eventListener
// nav.addEventListener('mouseover', e => {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', e => {
//   handleHover(e, 1);
// });

// Passing parameters into evenListener's callBack Function(can accept only 'this' parameter)
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Sticky Navigation

// Inefficient way
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Efficient way: Using Intersection Observer API:

// Below commented out code is for concept understanding.
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   // threshold: 0.1,
//   threshole: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = entries => {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Section Reveal

const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  // entries is basically the threshold array containing threshold values.
  // As of this function, we need only first array element of threshold entries, so we can either access it by index like entries[0] or simply use destructuring.
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

// IntersectionObserver's constructor needs a callback function and options Object as parameters.
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Lazy Image Loading

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Slider

const slides = document.querySelectorAll('.slide');
const btnleft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

// Create Dots
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

// Activate Dot

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

let curSlide = 0;
const maxSlide = slides.length - 1;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.6) translateX(-800px)';
// slider.style.overlay = 'visible';

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

// Setting first slide as default slide at the page load.
// slides.forEach((s, i) => {
//   s.style.transform = `translateX(${100 * i}%)`;
//   // 0% 100% 200% ..
// });

const init = () => {
  createDots();
  goToSlide(0);
  activateDot(0);
};

init();

// Next Slide
const nextSlide = () => {
  if (curSlide == maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Prev Slide
const prevSlide = () => {
  if (curSlide == 0) {
    curSlide = slides.length - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Right button
btnright.addEventListener('click', nextSlide);

// Left button
btnleft.addEventListener('click', prevSlide);

// Arrow buttons
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') prevSlide();
  else if (e.key === 'ArrowRight') nextSlide();
});

// Dot buttons
dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset; // object destructuring. Could have also done const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Concepts Learning and Practise:

// Creating, inserting and deleting elements:

// const header = document.querySelector('.header');

// const message = document.createElement('div');
// message.classList.add('cookie-message');

// Using  .insertAdjacentHTML():
// const htmlString = `We use cookies because we like to trouble our users so much. <button class="btn btn--close-cookie">Got it!</button>`;
// message.insertAdjacentHTML('afterbegin', htmlString);

// Using .innerHTML:
// message.innerHTML = `We use cookies as we like to trouble our customers so much.<button class="btn btn--close-cookie">Got it!</button>`;

// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// const GotIt = document.querySelector('.btn--close-cookie');
// GotIt.addEventListener('click', () => {
//   message.remove();
//   // message.parentElement.removeChild(message);  //Old Way
// });

// Styling

// message.style.backgroundColor = '#37383d';
// message.style.width = '100%';

// getComputedStyle('element/dom object').property  to get style property which is not inline.
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// To set manually style property...
// document.documentElement.style.setProperty('--color-primary', 'tomato');

// Attributes

// Standard
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);

// Setting Attributes which are Standard for the element:
// logo.alt = 'Mohit manipulates and detoriates whatever he uses.';

// Non-Standard
// console.log(logo.designer); // Won't work for Non-Standard Attributes......
// console.log(logo.getAttribute('designer')); // Need to use this method....

// Setting Non-Standard Attributes:
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src); // Absolute source
// console.log(logo.getAttribute('src')); // Local source according to stored location

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // Absolute source
// console.log(link.getAttribute('href')); // Local Source...

// Data Attributes
// console.log(logo.dataset.versionNumber);

// Classes: i, j, k, c are just dummy classes so that we don't get error as parameters cannot be empty for classlist property functions.
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.remove('k');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// Don't use below line for setting class name as it overrides all existing classes for the selected object/element and keeps only one class which is being set...
// logo.className = 'Jonas';

// Event Listeners...

// const h1 = document.querySelector('h1');

// Adding Event using addEventListener()
// h1.addEventListener('mouseenter', e => {
//   alert('Mouse Entered or hovered over the h1');
// });

// Adding Event in second way:
// h1.onmouseenter = e => {
//   alert('Mouse Entered or hovered over the h1');
// };

// Using addEventListener() to add events is better way than using second way as mentioned above because using addEventListener(), we can attach multiple events for same object or element. But, if we try doing so using the second way, it basically overrides the previous event.  Also, one more thing to remember is that when we create events and when the event occurs, then the event which happens is always available whether we use that event in our callBack function or not, that event parameter has all details related to the event occured.

// Now, we can also remove the event once it has happened, but for that we need to have named function which is called when that event occurs. Because, while ending/removing the event, we need the name of the function/callback function.

// const h1FunctionAlert = e => {
//   alert('Mouse Entered or hovered over the h1');
//   h1.removeEventListener('mouseenter', h1FunctionAlert); // Removing the event once occured.
// };

// Creating the events
// h1.addEventListener('mouseenter', h1FunctionAlert);

// We can also use the removeEventListener() outside the callback function, like also we could set the timeInterval after which the event should be removed.
// h1.removeEventListener('mouseenter', h1FunctionAlert); // Another way to end the event

// Ends the event after 10 seconds whether the event has occured or not.
// setInterval(() => h1.removeEventListener('mouseenter', h1FunctionAlert), 10000);

// Event Propogation
// rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomRGBColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomRGBColor());

// Bubbling which means after the capture phase(in Capture phase, when the action like click is performed on the target element, the event is generated at root means document initially, then from document it travels to the target element through the parent elements of the target element. This is known as Capturing Phase), the event reaches the target element which is known as Target Phase. Now, after the event occurs in the target phase, the event again travels to the document through all the parents of the target element. This creates a thought as if the event occured at every parent element of the target element. This is known as Bubbling or Bubbling Phase.

// Depicting Bubbling:
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // this refers to the target Element, here it is 'nav__link' class.
//   // console.log(this);
//   this.style.backgroundColor = randomRGBColor();
//   console.log('LINK', e.target, e.currentTarget); // target is the Element for which the event occured or was originally generated. currentTarget is the current Element for which the event is occuring.
//   console.log(e.currentTarget === this);

//   // Stop propogation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // this refers to the target Element, here it is 'nav__links' class.
//   this.style.backgroundColor = randomRGBColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// To exclude the Bubble capturing and enable Capture Phase, we need to pass true as third parameter in addEventListener();
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     // this refers to the target Element, here it is 'nav' class.
//     this.style.backgroundColor = randomRGBColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true
// );

// console.log(document.querySelector('.nav__links').childNodes);
// console.log(document.querySelector('.nav__links').children);
