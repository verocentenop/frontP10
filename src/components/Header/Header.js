import { Home } from '../../pages/Home/Home'
import { LoginBox } from '../../pages/Login/Login'
import { RegisterBox } from '../../pages/Register/Register'
import './Header.css'

const routes = [
  { texto: 'Inicio', funcion: Home, path: '/inicio' },
  // { texto: 'Mis Favoritos', funcion: Favoritos },
  { texto: 'Acceso', funcion: LoginBox, path: '/login' },
  { texto: 'Regístrate', funcion: RegisterBox, path: '/registro' }
]

export const Header = () => {
  const appContainer = document.querySelector('#app')
  const header = document.createElement('header')
  header.innerHTML = ''

  const nav = document.createElement('nav')
  for (const route of routes) {
    const a = document.createElement('a')
    a.href = route.path
    if (route.texto === 'Acceso' && localStorage.getItem('token')) {
      a.textContent = 'Cerrar Sesión'
      a.addEventListener('click', (e) => {
        e.preventDefault()
        localStorage.clear()
        window.location.reload()
        removeLoginForm()
      })
    } else {
      a.textContent = route.texto
      a.addEventListener('click', (e) => {
        e.preventDefault()
        window.history.pushState({}, '', route.path)
        route.funcion()
      })
    }

    nav.append(a)
  }
  header.append(nav)
  appContainer.append(header)

  if (localStorage.getItem('token')) {
    removeLoginForm()
  }
}
const removeLoginForm = () => {
  const loginForm = document.querySelector('form')

  if (loginForm) {
    loginForm.remove()
  }
}
