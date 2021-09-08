let tamanho = 2

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
