(() => {
  addEventOnGalleryImage()
  closeModal()
  window.onscroll = function() {header(), gallery()}
})()

function header() {
  const nav = document.querySelector('.js-header')
  if(!nav)  return //falls keine NavBar vorhanden 
  document.documentElement.scrollTop > 180 ? nav.classList.add("is-scroll") : nav.classList.remove("is-scroll")
}

function gallery() {
  const gallerySection = document.querySelector(".js-gallery")
  let galleryPosition = gallerySection.offsetTop
  let scrollBarPosition = document.documentElement.scrollTop
  let scrollDistance = galleryPosition
  let dataOffset = gallerySection.getAttribute('data-offset')
  const gallery = document.querySelector(".gallery")
  const arrayImg = [...document.querySelectorAll('.gallery__item')]

  if (scrollBarPosition >= galleryPosition - dataOffset) {

    for (let i=0; i<arrayImg.length; i++) {
      setInterval(() => {
        arrayImg[i].classList.add('is-displayed')
      }, 300 * i)
    }
  }
}

function addEventOnGalleryImage() {
  const galleryImage = [...document.querySelectorAll('.gallery__item')]
  const modal = document.querySelector('.modal')
  let modalImage = modal.querySelector('.modal__image')

  galleryImage.forEach(item => {
    item.addEventListener('click', event => {
      event.stopPropagation()
      modal.classList.add('is-visible')
      modalImage.src = item.src
    })
  })
}

function closeModal() {
  const modal = document.querySelector('.modal')

  document.querySelector('.modal__close').addEventListener('click', () => {
    modal.classList.remove('is-visible')
  })

   document.addEventListener('click', event => {
    if (event.target.className === 'modal__image') return
    modal.classList.remove('is-visible')
  })
}
