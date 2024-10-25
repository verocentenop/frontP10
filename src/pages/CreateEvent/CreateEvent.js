// import './CreateEvent.css'

// export const RegisterBox = () => {
//   const main = document.querySelector('main')
//   main.innerHTML = ''

//   const sectionContainer = document.createElement('section')
//   sectionContainer.id = 'register'

//   main.append(sectionContainer)
//   Register(sectionContainer)
// }

// export const createEvent = (ePadre) => {
//   const form = document.createElement('form')
//   const inputNombre = document.createElement('input')
//   const inputFecha = document.createElement('input')
//   const inputInfo = document.createElement('input')
//   const inputImg = document.createElement('input')
//   const inputUbi = document.createElement('input')
//   const inputAforo = document.createElement('input')
//   const inputCategoria = document.createElement('input')
//   const button = document.createElement('button')

//   inputUsername.placeholder = 'Usuario'
//   inputPassword.placeholder = '*******'
//   inputEmail.placeholder = 'ejemplo@ejemplo.com'

//   inputUsername.autocomplete = 'off'
//   inputPassword.autocomplete = 'off'
//   inputPassword.id = 'register-pw'
//   inputUsername.id = 'register-un'
//   inputEmail.id = 'register-email'
//   inputEdad.id = 'register-edad'
//   inputImg.id = 'register-img'
//   button.id = 'register-button'
//   button.textContent = 'Enviar'
//   inputPassword.type = 'password'
//   inputEdad.type = 'number'
//   inputImg.type = 'file'

//   inputEdad.min = '14'
//   inputEdad.max = '99'
//   inputEdad.placeholder = 'Edad (14 - 99)'

//   const isRegistered = document.createElement('p')
//   isRegistered.innerHTML = ` <a href=#login>¿Ya estás registrado?</a>`
//   isRegistered.querySelector('a').addEventListener('click', (e) => {
//     e.preventDefault()
//     LoginBox()
//   })

//   for (let age = 18; age <= 99; age++) {
//     const option = document.createElement('option')
//     option.value = age
//     option.textContent = age
//     inputEdad.appendChild(option)
//   }

//   ePadre.append(form)
//   form.append(
//     inputUsername,
//     inputPassword,
//     inputEmail,
//     inputEdad,
//     inputImg,
//     button,
//     isRegistered
//   )
//   form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     submit(
//       inputUsername.value,
//       inputPassword.value,
//       inputEmail.value,
//       inputEdad.value,
//       inputImg.files[0]
//     )
//   })
// }
