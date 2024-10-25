import './Button.css'

export const Button = ({ text, action }) => {
  const button = document.createElement('button')
  button.classList.add('button')
  button.textContent = text
  button.addEventListener('click', action)
  return button
}
