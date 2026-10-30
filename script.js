const menu = document.getElementById('menu')
const links = document.getElementById('links')
const nav = document.getElementById('nav')

menu.addEventListener('click', () => {
  const open = links.classList.toggle('open')
  menu.setAttribute('aria-expanded', open)
})
links.addEventListener('click', e => {
  if (e.target.tagName === 'A') { links.classList.remove('open'); menu.setAttribute('aria-expanded', false) }
})

addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true })

// Una sola pregunta abierta a la vez
document.querySelectorAll('.faq details').forEach(d => d.addEventListener('toggle', () => {
  if (d.open) document.querySelectorAll('.faq details').forEach(o => o !== d && (o.open = false))
}))

// Aparición suave al scrollear (el contenido ya es visible si no hay soporte)
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
  }), { rootMargin: '0px 0px -10% 0px' })
  document.querySelectorAll('.steps li, .member, .pros article, .res, .incl').forEach(el => {
    if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('reveal'); io.observe(el) }
  })
}

document.getElementById('year').textContent = new Date().getFullYear()

// Intro: se ve una vez por sesión y se puede saltear con un toque o una tecla
const intro = document.getElementById('intro')
if (intro && getComputedStyle(intro).display !== 'none') {
  const root = document.documentElement
  const skip = () => intro.classList.add('skip')
  const end = () => {
    intro.remove()
    root.classList.remove('intro-lock')
    removeEventListener('keydown', skip)
  }
  root.classList.add('intro-lock')
  try { sessionStorage.setItem('dv-intro', '1') } catch (e) {}
  intro.addEventListener('pointerdown', skip)
  addEventListener('keydown', skip)
  intro.addEventListener('animationstart', e => e.animationName === 'intro-exit' && root.classList.remove('intro-lock'))
  intro.addEventListener('animationend', e => e.target === intro && /intro-(exit|skip)/.test(e.animationName) && end())
  setTimeout(end, 6000)
}
