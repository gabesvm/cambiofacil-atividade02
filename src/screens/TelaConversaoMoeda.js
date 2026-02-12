import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, TextInput, Button, HelperText, Snackbar } from "react-native-paper";
import { converterMoeda, normalizarNumero, validarPositivo } from "../utils/regras";

export default function TelaConversaoMoeda() {
  const [valorReais, setValorReais] = useState("10");
  const [taxaCambio, setTaxaCambio] = useState("5,50");
  const [resultado, setResultado] = useState(null);

  const [erroValor, setErroValor] = useState("");
  const [erroTaxa, setErroTaxa] = useState("");
  const [snack, setSnack] = useState({ visivel: false, msg: "" });

  const podeCalcular = useMemo(() => {
    return valorReais.trim() !== "" && taxaCambio.trim() !== "";
  }, [valorReais, taxaCambio]);

  function limparErros() {
    setErroValor("");
    setErroTaxa("");
  }

  function calcular() {
    limparErros();

    const v = normalizarNumero(valorReais);
    const t = normalizarNumero(taxaCambio);

    const valV = validarPositivo(v);
    const valT = validarPositivo(t);

    let temErro = false;

    if (!valV.ok) {
      setErroValor(valV.msg);
      temErro = true;
    }
    if (!valT.ok) {
      setErroTaxa(valT.msg);
      temErro = true;
    }

    if (temErro) {
      setResultado(null);
      setSnack({ visivel: true, msg: "Corrija os campos para continuar." });
      return;
    }

    const convertido = converterMoeda(v, t);
    setResultado(convertido);
    setSnack({ visivel: true, msg: "Conversão calculada com sucesso!" });
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Title title="Conversão de Moeda" subtitle="BRL → Moeda estrangeira pela taxa" />
        <Card.Content>
          <TextInput
            label="Valor em Reais (R$)"
            mode="outlined"
            keyboardType="numeric"
            value={valorReais}
            onChangeText={setValorReais}
            error={!!erroValor}
            style={styles.input}
          />
          <HelperText type="error" visible={!!erroValor}>
            {erroValor}
          </HelperText>

          <TextInput
            label="Taxa de Câmbio"
            mode="outlined"
            keyboardType="numeric"
            value={taxaCambio}
            onChangeText={setTaxaCambio}
            error={!!erroTaxa}
            style={styles.input}
          />
          <HelperText type="error" visible={!!erroTaxa}>
            {erroTaxa}
          </HelperText>

          <Button
            mode="contained"
            onPress={calcular}
            disabled={!podeCalcular}
            style={styles.button}
          >
            Converter
          </Button>

          {resultado !== null && (
            <View style={styles.resultBox}>
              <Text variant="titleMedium" style={styles.resultTitle}>
                Resultado
              </Text>
              <Text variant="bodyLarge">
                O valor convertido é{" "}
                <Text variant="bodyLarge" style={styles.bold}>
                  {resultado.toFixed(2)}
                </Text>{" "}
                moedas estrangeiras.
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
  resultBox: { marginTop: 16, padding: 14, borderRadius: 12, backgroundColor: "#EEF1FF" },
  resultTitle: { marginBottom: 6 },
  bold: { fontWeight: "700" },
});
