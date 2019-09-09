(() => {
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
  const gallerySection = document.querySelector('.js-parallax')
  let galleryPosition = gallerySection.offsetTop
  let scrollBarPosition = getScrollTop()
  let dataOffset = gallerySection.getAttribute('data-offset')
  const arrayImg = [...document.querySelectorAll('.js-gallery-item')]

  if (scrollBarPosition >= galleryPosition - dataOffset) {

    for (let i = 0; i < arrayImg.length; i++) {
      setInterval(() => {
        arrayImg[i].classList.add('is-displayed')
      }, 300 * i)
    }
  }
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
  navItems.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault() //würde normalerweise auf andere Seite verweisen
      let section =  item.getAttribute('data-section')
      let offsetToTop = document.querySelector(`.${section}`).offsetTop //template literal
      smoothVerticalScrolling(500, offsetToTop + 1)

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
  navItems.forEach(item => {
    let offset = item.getAttribute('data-offset')
    let heightOffset = item.getAttribute('data-height')
    let sectionName =  item.getAttribute('data-section')
    let section = document.querySelector(`.${sectionName}`)
    let offsetToTop = section.offsetTop - offset
    let heightOfSection = +section.offsetHeight + +heightOffset
    let endOfSection = offsetToTop + heightOfSection 

    getScrollTop() < endOfSection && getScrollTop() > offsetToTop ? item.classList.add('is-highlighted') : item.classList.remove('is-highlighted')
  })
}

//scroll to top when clicking on button in footer
function goToTop() {
  document.querySelector('#toTop').addEventListener('click', () => {
    smoothVerticalScrolling(400, 0)
    
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

function smoothVerticalScrolling(time, offset) {
  let steps = (offset - getScrollTop()) / 100
  let curTime = 0
  while (curTime <= time) {
    window.setTimeout(SVS_B, curTime, steps)
    curTime += time / 100
  }
}

function SVS_B(steps) {
  window.scrollBy(0,  steps)
}
