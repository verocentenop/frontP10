import { Header } from '../../components/Header/Header'
import { Home } from '../Home/Home'
import './LoginRegister.css'

export const LoginRegister = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const loginContainer = document.createElement('section')
  loginContainer.id = 'login'

  main.append(loginContainer)
  Login(loginContainer)
}

export const Login = (ePadre) => {
  const form = document.createElement('form')

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

  ePadre.append(form)
  form.append(inputUser, inputPassword, button)
  form.addEventListener('submit', () =>
    submit(inputUser.value, inputPassword.value)
  )
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

  Home()
  Header()
}
// const submit = async (userName, password) => {
//   const objFinal = JSON.stringify({ userName, password })

//   const info = {
//     method: 'POST',
//     body: objFinal,
//     headers: { 'Content-Type': 'application/json' }
//   }

//   const res = await fetch('http://localhost:3000/api/v1/usuarios/login', info)

//   if (res.status === 400) {
//     const form = document.querySelector('form')
//     let existingError = document.querySelector('.inputError')

//     if (!existingError) {
//       const inputError = document.createElement('p')
//       inputError.textContent = 'Usuario o contraseña incorrectos'
//       inputError.className = 'inputError'
//       form.append(inputError)
//       return
//     }
//   }

//   const infoFinal = await res.json()

//   localStorage.setItem('token', infoFinal.token)
//   localStorage.setItem('usuario', JSON.stringify(infoFinal.usuario))
// }

// http://localhost:3000/api/v1/usuarios/login
