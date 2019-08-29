(() => {
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
        arrayImg[i].classList.add("is-displayed")
      }, 1000*i)
    }
  }
}





