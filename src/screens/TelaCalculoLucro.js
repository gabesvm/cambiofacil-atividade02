import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, TextInput, Button, HelperText, Snackbar } from "react-native-paper";
import {
  normalizarNumero,
  validarPositivo,
  calcularLucroTotal,
  calcularMargemPercentual,
} from "../utils/regras";

export default function TelaCalculoLucro() {
  const [custo, setCusto] = useState("12");
  const [precoVenda, setPrecoVenda] = useState("20");
  const [quantidade, setQuantidade] = useState("5");

  const [erroCusto, setErroCusto] = useState("");
  const [erroVenda, setErroVenda] = useState("");
  const [erroQtd, setErroQtd] = useState("");

  const [resultado, setResultado] = useState(null);
  const [snack, setSnack] = useState({ visivel: false, msg: "" });

  function limparErros() {
    setErroCusto("");
    setErroVenda("");
    setErroQtd("");
  }

  function calcular() {
    limparErros();

    const c = normalizarNumero(custo);
    const v = normalizarNumero(precoVenda);
    const q = normalizarNumero(quantidade);

    const valC = validarPositivo(c);
    const valV = validarPositivo(v);

    let temErro = false;

    if (!valC.ok) {
      setErroCusto(valC.msg);
      temErro = true;
    }

    if (!valV.ok) {
      setErroVenda(valV.msg);
      temErro = true;
    }

    if (!Number.isFinite(q)) {
      setErroQtd("Informe uma quantidade válida.");
      temErro = true;
    } else if (!Number.isInteger(q) || q <= 0) {
      setErroQtd("A quantidade deve ser um inteiro maior que 0.");
      temErro = true;
    }

    if (!temErro && v <= c) {
      setErroVenda("O preço de venda deve ser maior que o custo para ter lucro.");
      temErro = true;
    }

    if (temErro) {
      setResultado(null);
      setSnack({ visivel: true, msg: "Corrija os campos para calcular." });
      return;
    }

    const lucroTotal = calcularLucroTotal(v, c, q);
    const margem = calcularMargemPercentual(v, c);

    setResultado({ lucroTotal, margem, v, c, q });
    setSnack({ visivel: true, msg: "Lucro calculado com sucesso!" });
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Title title="Cálculo de Lucro" subtitle="Simule ganho total e margem percentual" />
        <Card.Content>
          <TextInput
            label="Custo (R$)"
            mode="outlined"
            keyboardType="numeric"
            value={custo}
            onChangeText={setCusto}
            error={!!erroCusto}
            style={styles.input}
          />
          <HelperText type="error" visible={!!erroCusto}>
            {erroCusto}
          </HelperText>

          <TextInput
            label="Preço de Venda (R$)"
            mode="outlined"
            keyboardType="numeric"
            value={precoVenda}
            onChangeText={setPrecoVenda}
            error={!!erroVenda}
            style={styles.input}
          />
          <HelperText type="error" visible={!!erroVenda}>
            {erroVenda}
          </HelperText>

          <TextInput
            label="Quantidade (unidades)"
            mode="outlined"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
            error={!!erroQtd}
            style={styles.input}
          />
          <HelperText type="error" visible={!!erroQtd}>
            {erroQtd}
          </HelperText>

          <Button mode="contained" onPress={calcular} style={styles.button}>
            Calcular lucro
          </Button>

          {resultado && (
            <View style={styles.resultBox}>
              <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                Resultado
              </Text>

              <Text variant="bodyLarge">
                Lucro total:{" "}
                <Text style={styles.bold}>R$ {resultado.lucroTotal.toFixed(2)}</Text>
              </Text>

              <Text variant="bodyLarge" style={{ marginTop: 6 }}>
                Margem:{" "}
                <Text style={styles.bold}>{resultado.margem.toFixed(2)}%</Text>
              </Text>
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
  resultBox: { marginTop: 16, padding: 14, borderRadius: 12, backgroundColor: "#FFF3E6" },
  bold: { fontWeight: "700" },
});
