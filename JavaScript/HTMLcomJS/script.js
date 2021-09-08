document.addEventListener('DOMContentLoaded', inserirBotoes)

let tamanho = 2

function inserirBotoes() {
  div = document.createElement('div')
  div.innerHTML = `
    <button onclick="aumentaTitulo()">+</button>
    <button onclick="diminuiTitulo()">-</button>
  `
  document.body.prepend(div)
}

function atualizaTamanho() {
  const h1 = document.querySelector('h1')
  h1.style.fontSize = `${tamanho}em`
}

function aumentaTitulo() {
  tamanho += 0.5
  atualizaTamanho()
}

function diminuiTitulo() {
  if (tamanho > 0) {
    tamanho -= 0.5
    atualizaTamanho()
  }
}
