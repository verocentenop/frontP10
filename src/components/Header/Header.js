import { Home } from '../../pages/Home/Home'
import { LoginRegister } from '../../pages/LoginRegister/LoginRegister'
import './Header.css'

const routes = [
  { texto: 'Inicio', funcion: Home },
  { texto: 'Acceso', funcion: LoginRegister }
  // { texto: 'CreateEvent', funcion: CreateEvent },
  // { texto: 'Home', funcion: Home }
]

export const Header = () => {
  const appContainer = document.querySelector('#app')
  const header = document.createElement('header')
  header.innerHTML = ''

  const nav = document.createElement('nav')
  for (const route of routes) {
    const a = document.createElement('a')
    a.href = '#'
    if (route.texto === 'Acceso' && localStorage.getItem('token')) {
      a.textContent = 'Cerrar Sesión'
      a.addEventListener('click', () => {
        localStorage.removeItem('token')
        Header()
        removeLoginForm()
      })
    } else {
      a.textContent = route.texto
      a.addEventListener('click', route.funcion)
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
