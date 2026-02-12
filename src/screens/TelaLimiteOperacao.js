import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, TextInput, Button, HelperText, Snackbar, Chip } from "react-native-paper";
import {
  normalizarNumero,
  validarPositivo,
  calcularLimiteOperacao,
  operacaoPermitida,
} from "../utils/regras";

export default function TelaLimiteOperacao() {
  const [saldo, setSaldo] = useState("1000");
  const [percentual, setPercentual] = useState("30");
  const [valorOperacao, setValorOperacao] = useState("200");

  const [erroSaldo, setErroSaldo] = useState("");
  const [erroPercentual, setErroPercentual] = useState("");
  const [erroOperacao, setErroOperacao] = useState("");

  const [resumo, setResumo] = useState(null);
  const [snack, setSnack] = useState({ visivel: false, msg: "" });

  function limparErros() {
    setErroSaldo("");
    setErroPercentual("");
    setErroOperacao("");
  }

  function calcular() {
    limparErros();

    const s = normalizarNumero(saldo);
    const p = normalizarNumero(percentual);
    const v = normalizarNumero(valorOperacao);

    const valS = validarPositivo(s);
    const valV = validarPositivo(v);

    let temErro = false;

    if (!valS.ok) {
      setErroSaldo(valS.msg);
      temErro = true;
    }

    if (!Number.isFinite(p)) {
      setErroPercentual("Informe um percentual válido.");
      temErro = true;
    } else if (p <= 0 || p > 100) {
      setErroPercentual("Use um percentual entre 1 e 100.");
      temErro = true;
    }

    if (!valV.ok) {
      setErroOperacao(valV.msg);
      temErro = true;
    }

    if (temErro) {
      setResumo(null);
      setSnack({ visivel: true, msg: "Revise os campos e tente novamente." });
      return;
    }

    const limite = calcularLimiteOperacao(s, p);
    const pode = operacaoPermitida(v, limite);

    setResumo({ limite, pode, s, p, v });
    setSnack({ visivel: true, msg: "Limite calculado!" });
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Title title="Limite de Operação" subtitle="Controle por % do saldo disponível" />
        <Card.Content>
          <TextInput
            label="Saldo da Conta (R$)"
            mode="outlined"
            keyboardType="numeric"
            value={saldo}
            onChangeText={setSaldo}
            error={!!erroSaldo}
            style={styles.input}
          />
          <HelperText type="error" visible={!!erroSaldo}>
            {erroSaldo}
          </HelperText>

          <TextInput
            label="Percentual de Limite (%)"
            mode="outlined"
            keyboardType="numeric"
            value={percentual}
            onChangeText={setPercentual}
            error={!!erroPercentual}
            style={styles.input}
          />
          <HelperText type="error" visible={!!erroPercentual}>
            {erroPercentual}
          </HelperText>

          <TextInput
            label="Valor da Operação (R$)"
            mode="outlined"
            keyboardType="numeric"
            value={valorOperacao}
            onChangeText={setValorOperacao}
            error={!!erroOperacao}
            style={styles.input}
          />
          <HelperText type="error" visible={!!erroOperacao}>
            {erroOperacao}
          </HelperText>

          <Button mode="contained" onPress={calcular} style={styles.button}>
            Calcular limite
          </Button>

          {resumo && (
            <View style={styles.resultBox}>
              <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                Resumo
              </Text>

              <Text variant="bodyLarge">
                Limite calculado:{" "}
                <Text style={styles.bold}>R$ {resumo.limite.toFixed(2)}</Text>
              </Text>

              <View style={{ marginTop: 10, flexDirection: "row" }}>
                {resumo.pode ? (
                  <Chip icon="check" style={[styles.chip, styles.chipOk]}>
                    Operação permitida
                  </Chip>
                ) : (
                  <Chip icon="alert" style={[styles.chip, styles.chipNo]}>
                    Operação bloqueada
                  </Chip>
                )}
              </View>

              {!resumo.pode && (
                <Text style={{ marginTop: 10 }}>
                  Dica: reduza o valor da operação ou aumente o percentual (até 100%).
                </Text>
              )}
            </View>
          )}
        </Card.Content>
      </Card>

      <Snackbar
        visible={snack.visivel}
        onDismiss={() => setSnack({ visivel: false, msg: "" })}
        duration={2500}
      >
        {snack.msg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F6F7FB" },
  card: { borderRadius: 16 },
  input: { marginTop: 10 },
  button: { marginTop: 14, borderRadius: 12, paddingVertical: 6 },
  resultBox: { marginTop: 16, padding: 14, borderRadius: 12, backgroundColor: "#EFFFF5" },
  bold: { fontWeight: "700" },
  chip: { borderRadius: 999, paddingHorizontal: 8 },
  chipOk: { backgroundColor: "#D8F3DC" },
  chipNo: { backgroundColor: "#FFE3E3" },
});
