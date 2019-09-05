(() => {
  openModal()
  closeModal()
  goToTop()
  addEventToNavBar()
  showNavBar()
  window.onscroll = function() {header(), gallery()}
})()

//change style of navigation after scrolling 
function header() {
  const nav = document.querySelector('.js-header')
  if(!nav)  return //falls keine NavBar vorhanden 
  document.documentElement.scrollTop > 180 ? nav.classList.add('is-scrolled') : nav.classList.remove("is-scrolled")
}

//fade in of gallery images when scrolling to gallery section 
function gallery() {
  const gallerySection = document.querySelector('.js-parallax')
  let galleryPosition = gallerySection.offsetTop
  let scrollBarPosition = document.documentElement.scrollTop
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
  const navItems = [...document.querySelectorAll('.navbar__item')]
  navItems.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault() //würde normalerweise auf andere Seite verweisen
      let offset = item.getAttribute('data-offset')
      let section =  item.getAttribute('data-section')
      let offsetToTop = document.querySelector(`.${section}`).offsetTop //template literal
      window.scrollTo({ top: offsetToTop-offset, left: 0, behavior: "smooth" })
      if (item.classList.contains('is-responsive')) {
        navItems.forEach(i => {
          i.classList.remove('is-responsive')
        })
      }
    })
  })
}

//scroll to top when clicking on button in footer
function goToTop() {
  document.querySelector('#toTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  })
}

//show or hide items of navbar, respond-to-mobile
function showNavBar() {
  document.querySelector('.navbar-toggler').addEventListener('click', () => {
    const navbar = [...document.querySelectorAll('.navbar__item')]

    navbar.forEach(item => {
      item.classList.contains('is-responsive') ? item.classList.remove('is-responsive') : item.classList.add('is-responsive')
    })
  })
}
