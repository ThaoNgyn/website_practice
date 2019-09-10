(() => {
  loadMoreGallery()
  openModal()
  closeModal()
  goToTop()
  addEventToNavBar()
  showNavBar()
  progressBar()
  window.onscroll = function() {header(), gallery(), changeColorNavBarItems()}
})()

function getScrollTop() {
  return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
}

//change style of navigation after scrolling 
function header() {
  const nav = document.querySelector('.js-header')
  if(!nav)  return //falls keine NavBar vorhanden 
  getScrollTop() > 180 ? nav.classList.add('is-scrolled') : nav.classList.remove("is-scrolled")
}

//fade in of gallery images when scrolling to gallery section 
function gallery() {
  const startPos = document.querySelector('.js-portfolio-parallax').offsetTop
  const heightNavbar = outerHeight(document.querySelector('.js-header'))
  const arrayImg = [...document.querySelectorAll('.js-gallery-item')]

  if (getScrollTop() >= startPos - heightNavbar) {
    for (let i = 0; i < 8; i++) {
      setInterval(() => {
        arrayImg[i].classList.add('is-displayed')
      }, 300 * i)
    }
  }
  if (arrayImg.length == 8) hideLoadMoreBtn()
}

function loadMoreGallery() {
  const loadMoreBtn = document.documentElement.querySelector('.js-gallery-loadMore')
  loadMoreBtn.addEventListener('click', () => {
    const arrayImg = [...document.querySelectorAll('.js-gallery-item')]
    let num = 0;
    arrayImg.length <= 16 ? num = arrayImg.length : num = 16;

    for (let i = 0; i < num; i++) {
      setInterval(() => {
        arrayImg[i].classList.add('is-displayed')
      }, 300 * (i - 8))
    }

    hideLoadMoreBtn()
  })
}

function hideLoadMoreBtn() {
  const loadMoreBtn = document.documentElement.querySelector('.js-gallery-loadMore')
  loadMoreBtn.classList.add('u-hidden')
}

//open modal when clicking on gallery image
function openModal() {
  const galleryImage = [...document.querySelectorAll('.js-gallery-item')]
  const modal = document.querySelector('.js-modal')
  let modalImage = modal.querySelector('.js-modal-image')
  let imageCaption = modal.querySelector('.js-modal-caption')

  galleryImage.forEach(item => {
    item.addEventListener('click', event => {
      event.stopPropagation()
      modal.classList.add('is-visible')
      modalImage.src = item.src
      modalImage.alt = item.alt
      imageCaption.innerHTML = modalImage.alt
    })
  })
}

//close modal when clicking on "close" or black background
function closeModal() {
  const modal = document.querySelector('.js-modal')

  document.querySelector('.js-model-close').addEventListener('click', () => {
    modal.classList.remove('is-visible')
  })

  document.addEventListener('click', event => {
    if (event.target.classList.contains('js-modal-image')) return
    modal.classList.remove('is-visible')
  })
}

//scroll to section when clicking on navbar items
function addEventToNavBar() {
  const navItems = [...document.querySelectorAll('.js-navbar-item')]
  const heightNavbar = outerHeight(document.querySelector('.js-header'))
  navItems.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault() //würde normalerweise auf andere Seite verweisen
      let section =  item.getAttribute('data-section')
      let offsetToTop = document.querySelector(`.${section}`).offsetTop //template literal
      doScrolling(offsetToTop - heightNavbar + 1, 500)

      if (item.classList.contains('is-responsive')) {
        navItems.forEach(i => {
          i.classList.remove('is-responsive')
        })
      }
    })
  })
}

//highlight navbar item when in that section
function changeColorNavBarItems() {
  const navItems = [...document.querySelectorAll('.js-navbar-item')]
  const heightNavbar = outerHeight(document.querySelector('.js-header'))
  calcHeightGallery()
  navItems.forEach(item => {
    let heightOffset = item.getAttribute('data-height')
    let sectionName =  item.getAttribute('data-section')
    let section = document.querySelector(`.${sectionName}`)
    let offsetToTop = section.offsetTop - heightNavbar
    let heightOfSection = +outerHeight(section) + +heightOffset 
    let endOfSection = offsetToTop + heightOfSection 
    getScrollTop() < endOfSection && getScrollTop() >= offsetToTop ? item.classList.add('is-highlighted') : item.classList.remove('is-highlighted')
  })
}

//scroll to top when clicking on button in footer
function goToTop() {
  document.querySelector('#toTop').addEventListener('click', () => {
    doScrolling(0, 500)
  })
}

//show or hide items of navbar, respond-to-mobile
function showNavBar() {
  document.querySelector('.js-navbar-toggler').addEventListener('click', () => {
    const navbar = [...document.querySelectorAll('.js-navbar-item')]
    navbar.forEach(item => {
      item.classList.contains('is-responsive') ? item.classList.remove('is-responsive') : item.classList.add('is-responsive')
    })
  })
}

//write width and text to progress bar
function progressBar() {
  const bars = [...document.querySelectorAll('.js-progress-bar')]
  bars.forEach(item => {
    let value = item.getAttribute('data-value')
    item.style.width = `${value}%`
    item.innerHTML = `${value}%`
  })
}

//get full height of element 
function outerHeight(element) {
  var height = element.offsetHeight;
  var style = getComputedStyle(element);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}

function calcHeightGallery() {
  const navItem = document.documentElement.querySelector('li:nth-child(3)')
  let dataHeight = outerHeight(document.documentElement.querySelector('.js-gallery'))
  navItem.setAttribute("data-height", dataHeight)
}

//smooth scrolling
function doScrolling(elementY, duration) { 
  let startingY = window.pageYOffset;
  let diff = elementY - startingY;
  let start;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    // Elapsed milliseconds since start of scrolling.
    let time = timestamp - start;
    // Get percent of completion in range [0, 1].
    let percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  })
}
