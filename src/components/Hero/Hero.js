import './Hero.css'

export const Hero = () => {
  const main = document.querySelector('main')
  const hero = document.createElement('section')
  hero.id = 'hero'
  const texto = document.createElement('h2')
  texto.textContent = 'Tu plataforma para organizar eventos deportivos'
  const description = document.createElement('p')
  description.textContent =
    'Donde quieras, cuando quieras, con quien quieras. Tú decides.'
  hero.append(texto, description)
  return hero
}
