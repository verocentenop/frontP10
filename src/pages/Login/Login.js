import './Login.css'
import { Header } from '../../components/Header/Header'
import { Home } from '../Home/Home'

export const LoginBox = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const sectionContainer = document.createElement('section')
  sectionContainer.id = 'login-section'

  main.append(sectionContainer)
  Login(sectionContainer)
}

export const Login = () => {
  const container = document.querySelector('#login-section')
  const form = document.createElement('form')
  form.id = 'login'
  const inputUser = document.createElement('input')
  const inputPassword = document.createElement('input')
  const button = document.createElement('button')
  inputUser.placeholder = 'Usuario'
  inputPassword.placeholder = '*******'
  inputUser.autocomplete = 'off'
  inputPassword.autocomplete = 'off'
  inputPassword.id = 'password'
  inputUser.id = 'userName'
  button.textContent = 'Acceder'

  inputPassword.type = 'password'

  container.append(form)
  form.append(inputUser, inputPassword, button)
  form.addEventListener('submit', (e) => {
    e.preventDefault(), submit(inputUser.value, inputPassword.value)
  })
}

const submit = async (userName, password) => {
  const objFinal = JSON.stringify({ userName, password })

  const info = {
    method: 'POST',
    body: objFinal,
    headers: { 'Content-Type': 'application/json' }
  }

  const res = await fetch('http://localhost:3000/api/v1/usuarios/login', info)

  if (res.status === 400) {
    const form = document.querySelector('form')
    let existingError = document.querySelector('.inputError')

    if (!existingError) {
      const inputError = document.createElement('p')
      inputError.textContent = 'Usuario o contraseña incorrectos'
      inputError.className = 'inputError'
      form.append(inputError)
      return
    }
  }

  const inputError = document.querySelector('.inputError')
  if (inputError) {
    inputError.remove()
  }

  const infoFinal = await res.json()

  localStorage.setItem('token', infoFinal.token)
  localStorage.setItem('usuario', JSON.stringify(infoFinal.usuario))

  document.querySelector('#app').innerHTML = ''
  Home()
}
