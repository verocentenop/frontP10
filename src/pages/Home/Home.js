import './Home.css'
import { Hero } from '../../components/Hero/Hero'
import { Header } from '../../components/Header/Header'

export const Home = async () => {
  const appContainer = document.querySelector('#app')
  const main = document.createElement('main')
  main.innerHTML = ''

  document.querySelector('#app').innerHTML = ''
  Header()
  const hero = Hero()
  main.append(hero)

  const info = await fetch('http://localhost:3000/api/v1/eventos')
  const eventos = await info.json()

  mostrarEventos(eventos, main)
  appContainer.append(hero, main)
}

export const mostrarEventos = (eventos, ePadre) => {
  ePadre.innerHTML = ''
  for (const evento of eventos) {
    const eventoContainer = document.createElement('article')
    const nombre = document.createElement('h2')
    const imagen = document.createElement('img')
    const informacion = document.createElement('p')
    const fecha = document.createElement('h3')
    const ubicacion = document.createElement('p')
    const capacidad = document.createElement('p')

    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const isLoggedIn = usuario && usuario.userName

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
    capacidad.textContent = `Asistentes: ${evento.personasApuntadas || 0} de ${
      evento.capacidad
    }`

    const joinButton = document.createElement('button')

    if (isLoggedIn) {
      const yaApuntado = evento.asistentes.some(
        (asistente) => asistente.userName === usuario.userName
      )

      if (yaApuntado) {
        joinButton.textContent = 'Salir del evento'
        joinButton.addEventListener('click', async () => {
          const response = await salirDelEvento(evento._id)
          if (response) {
            capacidad.textContent = `${response.asistentesEvento} de ${response.capacidadMaxima}`
            joinButton.textContent = '¡Apúntate!'
          }
        })
      } else {
        joinButton.textContent = '¡Apúntate!'
        joinButton.addEventListener('click', async () => {
          const response = await joinEvent(evento._id)
          if (response) {
            capacidad.textContent = `${response.asistentesEvento} de ${response.capacidadMaxima}`
            joinButton.textContent = 'Salir del evento'
          }
        })
      }
    } else {
      joinButton.textContent = 'Inicia sesión para apuntarte'
      joinButton.disabled = true
    }

    eventoContainer.append(
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
const joinEvent = async (eventoId) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))
  if (!usuario || !usuario.userName) {
    alert('Inicia sesión o regístrate para apuntarte a un evento.')
    return null
  }
  const data = {
    eventosConfirmados: eventoId,
    userName: usuario.userName
  }
  console.log('Datos a enviar:', data)
  console.log('Token:', localStorage.getItem('token'))

  try {
    const res = await fetch('http://localhost:3000/api/v1/asistentes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error('Error al apuntarte')

    const resultado = await res.json()
    alert('Te has registrado correctamente en el evento.')
    return resultado
  } catch (error) {
    console.error('Error en fetch:', error)
    alert(error.message)
    return null
  }
}
const salirDelEvento = async (eventoId) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  if (!usuario || !usuario.userName) {
    alert('Inicia sesión o regístrate para gestionar tu asistencia.')
    return null
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/asistentes/${eventoId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    if (!res.ok) throw new Error('Error al salir del evento')

    const resultado = await res.json()
    alert('Has salido del evento correctamente.')
    return resultado
  } catch (error) {
    console.error('Error en fetch:', error)
    alert(error.message)
    return null
  }
}
