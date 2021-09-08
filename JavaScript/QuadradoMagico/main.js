// variáveis globais
const ordem = 3
const h2 = document.querySelector('h2')

// criando matriz
const matriz = Array(ordem)

for (i = 0; i < matriz.length; i++) {
  matriz[i] = Array(ordem)
}

const somaNumeros = 15

// chamando função quando página é carregada
document.addEventListener('DOMContentLoaded', () => {
  insereTabela()
})

// inserindo tabela
function insereTabela() {
  const tabela = document.createElement('table')
  tabela.id = 'quadradomagico'
  document.body.append(tabela)

  for (let i = 0; i < ordem; i++) {
    const linha = document.createElement('tr')
    tabela.append(linha)

    for (let j = 0; j < ordem; j++) {
      const celula = document.createElement('td')
      linha.append(celula)
      celula.id = `lin${i}col${j}`
      insereInput(celula)
    }
  }
}

function getLinhaColuna(celula) {
  const [linha, coluna] = celula.id.split('col')
  return [linha.split('lin')[1], coluna]
}

// inserindo input
function insereInput(celula) {
  const input = document.createElement('input')
  celula.append(input)
  input.addEventListener('change', () => {
    const valor = parseInt(input.value)
    const [linha, coluna] = getLinhaColuna(celula)
    matriz[linha][coluna] = valor
    const quadradoCompleto = verificaMatriz()

    if (quadradoCompleto) {
      document.querySelector('#quadradomagico').classList.add('vitoria')
    } else {
      document.querySelector('#quadradomagico').classList.remove('vitoria')
    }
  })
}

/*
Colocando e tirando classes da celula
*/
function atribuiClasseCelula(classe, i, j) {
  const celula = document.querySelector(`#lin${i}col${j}`)
  celula.classList.add(classe)
}

function removeClasseCelula(classe, i, j) {
  const celula = document.querySelector(`#lin${i}col${j}`)
  celula.classList.remove(classe)
}

/*
Verificando se o quadrado foi resolvido corretamente
*/
function verificaMatriz() {
  const numerosRepetidos = verificaNumerosRepetidos()

  const numerosForaLimites = verificaNumerosForaLimites()

  const todasSomasOK = verificaSomas()

  return !numerosRepetidos && !numerosForaLimites && todasSomasOK
}

// verificando se as somas estão corretas
function verificaSomas() {
  const diagonalPrincipalOK = verificaSomaDiagonalPrincipal()
  const diagonalSecundariaOK = verificaSomaDiagonalSecundaria()
  const todasLinhasOK = verificaSomaLinhas()
  const todasColunasOK = verificaSomaColunas()

  return (
    diagonalPrincipalOK &&
    diagonalSecundariaOK &&
    todasLinhasOK &&
    todasColunasOK
  )
}

// verificando se existe um número repitido
function verificaNumerosRepetidos() {
  const numeros = Array(ordem ** 2).fill(0)
  let numerosRepetidos = false

  for (let i = 0; i < ordem; i++) {
    for (let j = 0; j < ordem; j++) {
      const valor = matriz[i][j]

      if (!isNaN(valor)) {
        numeros[valor - 1]++
      }
    }
  }

  for (let i = 0; i < ordem; i++) {
    for (let j = 0; j < ordem; j++) {
      const valor = matriz[i][j]

      if (!isNaN(valor) && numeros[valor - 1] > 1) {
        numerosRepetidos = true
        atribuiClasseCelula('numerosrepetidos', i, j)
      } else {
        removeClasseCelula('numerosrepetidos', i, j)
      }
    }
  }

  return numerosRepetidos
}

// verificando se o número está fora dos limites do jogo
function verificaNumerosForaLimites() {
  const minimo = 1
  const maximo = ordem ** 2
  let numerosForaLimites = false

  for (let i = 0; i < ordem; i++) {
    for (let j = 0; j < ordem; j++) {
      if (matriz[i][j] < minimo || matriz[i][j] > maximo) {
        numerosForaLimites = true
        atribuiClasseCelula('foradoslimites', i, j)
      } else {
        removeClasseCelula('foradoslimites', i, j)
      }
    }
  }

  return numerosForaLimites
}

// verificando diagonal principal
function verificaSomaDiagonalPrincipal() {
  let soma = 0

  for (i = 0; i < ordem; i++) {
    if (matriz[i][i] == null) {
      return false
    }
    soma += matriz[i][i]
  }

  if (soma != somaNumeros) {
    for (i = 0; i < ordem; i++) {
      atribuiClasseCelula('somaerradadiagonalprincipal', i, i)
    }

    return false
  } else {
    for (i = 0; i < ordem; i++) {
      removeClasseCelula('somaerradadiagonalprincipal', i, i)
    }
  }

  return true
}

// verificando diagonal secundária
function verificaSomaDiagonalSecundaria() {
  let soma = 0

  for (i = 0; i < ordem; i++) {
    if (matriz[i][ordem - i - 1] == null) {
      return false
    }
    soma += matriz[i][ordem - i - 1]
  }

  if (soma != somaNumeros) {
    for (i = 0; i < ordem; i++) {
      atribuiClasseCelula('somaerradadiagonalsecundaria', i, ordem - i - 1)
    }

    return false
  } else {
    for (i = 0; i < ordem; i++) {
      removeClasseCelula('somaerradadiagonalsecundaria', i, ordem - i - 1)
    }
  }

  return true
}

// verificando soma das linhas
function verificaSomaLinhas() {
  let todasLinhasOK = true

  for (i = 0; i < ordem; i++) {
    todasLinhasOK &= verificaSomaLinha(i)
  }

  return todasLinhasOK
}

// somando as linhas
function verificaSomaLinha(i) {
  let soma = 0

  for (j = 0; j < ordem; j++) {
    if (matriz[i][j] == null) {
      return false
    }
    soma += matriz[i][j]
  }

  if (soma != somaNumeros) {
    for (j = 0; j < ordem; j++) {
      atribuiClasseCelula('somaerradalinhas', i, j)
    }

    return false
  } else {
    for (j = 0; j < ordem; j++) {
      removeClasseCelula('somaerradalinhas', i, j)
    }
  }

  return true
}

// verificando soma das colunas
function verificaSomaColunas() {
  let todasColunasOK = true

  for (j = 0; j < ordem; j++) {
    todasColunasOK &= verificaSomaColuna(j)
  }

  return todasColunasOK
}

// somando as colunas
function verificaSomaColuna(j) {
  let soma = 0

  for (i = 0; i < ordem; i++) {
    if (matriz[i][j] == null) {
      return false
    }
    soma += matriz[i][j]
  }

  if (soma != somaNumeros) {
    for (i = 0; i < ordem; i++) {
      atribuiClasseCelula('somaerradacolunas', i, j)
    }

    return false
  } else {
    for (i = 0; i < ordem; i++) {
      removeClasseCelula('somaerradacolunas', i, j)
    }
  }

  return true
}
