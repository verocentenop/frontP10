import { Home } from '../Home/Home'
import { Login, LoginBox } from '../Login/Login'
import './Register.css'

export const RegisterBox = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const sectionContainer = document.createElement('section')
  sectionContainer.id = 'register'

  main.append(sectionContainer)
  Register(sectionContainer)
}

export const Register = (ePadre) => {
  const form = document.createElement('form')
  const inputUsername = document.createElement('input')
  const inputPassword = document.createElement('input')
  const inputEmail = document.createElement('input')
  const inputEdad = document.createElement('input')
  const inputImg = document.createElement('input')
  const button = document.createElement('button')

  inputUsername.placeholder = 'Usuario'
  inputPassword.placeholder = '*******'
  inputEmail.placeholder = 'ejemplo@ejemplo.com'

  inputUsername.autocomplete = 'off'
  inputPassword.autocomplete = 'off'
  inputPassword.id = 'register-pw'
  inputUsername.id = 'register-un'
  inputEmail.id = 'register-email'
  inputEdad.id = 'register-edad'
  inputImg.id = 'register-img'
  button.id = 'register-button'
  button.textContent = 'Enviar'
  inputPassword.type = 'password'
  inputEdad.type = 'number'
  inputImg.type = 'file'

  inputEdad.min = '14'
  inputEdad.max = '99'
  inputEdad.placeholder = 'Edad (14 - 99)'

  const isRegistered = document.createElement('p')
  isRegistered.innerHTML = ` <a href=#login>¿Ya estás registrado?</a>`
  isRegistered.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault()
    LoginBox()
  })

  for (let age = 18; age <= 99; age++) {
    const option = document.createElement('option')
    option.value = age
    option.textContent = age
    inputEdad.appendChild(option)
  }

  ePadre.append(form)
  form.append(
    inputUsername,
    inputPassword,
    inputEmail,
    inputEdad,
    inputImg,
    button,
    isRegistered
  )
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    submit(
      inputUsername.value,
      inputPassword.value,
      inputEmail.value,
      inputEdad.value,
      inputImg.files[0]
    )
  })
}

const submit = async (userName, password, email, edad, img) => {
  const objFinal = JSON.stringify({ userName, password, email, edad, img })

  const info = {
    method: 'POST',
    body: objFinal,
    headers: { 'Content-Type': 'application/json' }
  }

  const res = await fetch(
    'http://localhost:3000/api/v1/usuarios/registro',
    info
  )

  if (res.status === 400) {
    const form = document.querySelector('form')
    let existingError = document.querySelector('.inputError')

    if (!existingError) {
      const inputError = document.createElement('p')
      inputError.textContent = 'Error en el registro'
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
