import './Home.css'
import { Hero } from '../../components/Hero/Hero'

export const Home = async () => {
  const appContainer = document.querySelector('#app')
  const main = document.createElement('main')
  main.innerHTML = ''

  const hero = Hero()
  main.append(hero)

  const info = await fetch('http://localhost:3000/api/v1/eventos')
  const eventos = await info.json()

  mostrarEventos(eventos, main)
  appContainer.append(main)
}

const mostrarEventos = (eventos, ePadre) => {
  for (const evento of eventos) {
    const eventoContainer = document.createElement('article')
    const nombre = document.createElement('h2')
    const imagen = document.createElement('img')
    const informacion = document.createElement('p')
    const fecha = document.createElement('h3')
    const ubicacion = document.createElement('p')
    const capacidad = document.createElement('p')

    const like = document.createElement('img')
    like.addEventListener('click', () => addFavorito(evento._id))

    like.src = '/assets/like.png'
    like.className = 'like'

    nombre.textContent = evento.nombre
    imagen.src = evento.imagen
    informacion.textContent = evento.informacion
    const fechaOriginal = new Date(evento.fecha)
    const fechaFormateada = fechaOriginal.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    const horaFormateada = fechaOriginal.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })

    fecha.textContent = `${fechaFormateada}  ${horaFormateada}`
    ubicacion.textContent = evento.ubicacion
    capacidad.textContent = `${evento.capacidad} personas`

    const joinButton = document.createElement('button')
    joinButton.textContent = '¡Apúntate!'

    eventoContainer.append(
      like,
      nombre,
      imagen,
      informacion,
      fecha,
      ubicacion,
      capacidad,
      joinButton
    )
    ePadre.append(eventoContainer)
  }
}
const addFavorito = async (idEvento) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))
  const infoFinal = JSON.stringify({ favoritos: [idEvento] })

  const info = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: infoFinal
  }

  const res = await fetch(
    `http://localhost:3000/api/v1/usuarios/${usuario._id}`,
    info
  )
  const respuesta = await res.json()
  console.log(respuesta)
}
