const startBtn = document.querySelector('#start');
const output = document.querySelector('#output');
const escutando = document.querySelector('#escutando');
let = esta_escutando = false

const contemOperacao = (calculo) => {
  const todas_operacoes = ['+', '-', 'x', '/'];
  return todas_operacoes.find((operacao) => calculo.includes(operacao))
}

const formatarCalculo = (calculo) => {
  const operacao = contemOperacao(calculo);

  if (!operacao) {
    return output.textContent = 'Operação Invalida! Repita por favor';
  }

  const resultado = calcular(calculo, operacao);

  return output.textContent = `O resultado é: ${resultado}`
}

const calcular = (calculo, operacao) => {
  const calculo_formatado = calculo.split(operacao)
  const num1 = Number(calculo_formatado[0]);
  const num2 = Number(calculo_formatado[1]);

  switch (operacao) {
    case '+':
      return num1 + num2;

    case '-':
      return num1 - num2;

    case 'x':
      return num1 * num2;

    case '/':
      return num1 / num2;
  }
}

const recognition = new webkitSpeechRecognition();
recognition.interimResults = true;
recognition.lang = "pt-BR";
recognition.continuous = true;

const startVoz = () => {
  escutando.textContent = 'Escutando...'
  return recognition.start()
}

const stopVoz = () => {
  escutando.textContent = 'Parado'
  return recognition.stop()
}

recognition.onresult = function (event) {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      const calculo = event.results[i][0].transcript.trim();
      formatarCalculo(calculo);
      stopVoz();
    }
  }
};

startBtn.addEventListener('click', () => {
  esta_escutando = !esta_escutando
  esta_escutando ? startVoz() : stopVoz()
});
