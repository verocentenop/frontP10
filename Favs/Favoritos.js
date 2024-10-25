// import { mostrarEventos } from '../Home/Home'
// import './Favoritos.css'

// export const Favoritos = async () => {
//   const main = document.querySelector('main')
//   main.innerHTML = ''

//   const usuario = JSON.parse(localStorage.getItem('usuario'))

//   const info = await fetch(
//     `http://localhost:3000/api/v1/usuarios/${usuario._id}`
//   )

//   const user = await info.json()

//   const favoritosContainer = document.createElement('section')
//   favoritosContainer.id = 'favoritos-container'
//   main.append(favoritosContainer)

//   mostrarEventos(user.favoritos, main)
// }
