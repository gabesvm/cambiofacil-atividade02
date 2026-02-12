// Aqui ficam as REGRAS DE NEGÓCIO (Atividade 1)
// A professora normalmente quer ver essas funções reaproveitadas no app (Atividade 2).

export function normalizarNumero(texto) {
  if (texto === null || texto === undefined) return NaN;

  // Aceita vírgula ou ponto
  const limpo = String(texto)
    .trim()
    .replace(/\s/g, "")
    .replace(",", ".");

  const numero = Number(limpo);
  return numero;
}

export function validarPositivo(numero) {
  if (!Number.isFinite(numero)) return { ok: false, msg: "Informe um número válido." };
  if (numero <= 0) return { ok: false, msg: "O valor deve ser maior que 0." };
  return { ok: true, msg: "" };
}

// 1) Conversão de moeda
export function converterMoeda(valorEmReais, taxaCambio) {
  // Exemplo simples: valor * taxa
  // (Se sua atividade 1 pedia diferente, você ajusta aqui e o app inteiro continua funcionando.)
  return valorEmReais * taxaCambio;
}

// 2) Limite de operação
export function calcularLimiteOperacao(saldoConta, percentualLimite) {
  // Ex: se percentual = 30, limite = saldo * 0.30
  return saldoConta * (percentualLimite / 100);
}

export function operacaoPermitida(valorOperacao, limite) {
  return valorOperacao <= limite;
}

// 3) Cálculo de lucro
export function calcularLucroTotal(precoVenda, custo, quantidade) {
  // lucro total = (precoVenda - custo) * quantidade
  return (precoVenda - custo) * quantidade;
}

export function calcularMargemPercentual(precoVenda, custo) {
  // margem % = (lucro unitário / custo) * 100
  const lucroUnitario = precoVenda - custo;
  if (custo <= 0) return NaN;
  return (lucroUnitario / custo) * 100;
}
