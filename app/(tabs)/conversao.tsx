import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, TextInput, Button, HelperText, Snackbar } from "react-native-paper";
import { converterMoeda, normalizarNumero, validarPositivo } from "../../src/utils/regras";

export default function Conversao() {
  const [valorReais, setValorReais] = useState("10");
  const [taxaCambio, setTaxaCambio] = useState("5,50");
  const [resultado, setResultado] = useState<number | null>(null);

  const [erroValor, setErroValor] = useState("");
  const [erroTaxa, setErroTaxa] = useState("");
  const [snack, setSnack] = useState({ visivel: false, msg: "" });

  const podeCalcular = useMemo(() => {
    return valorReais.trim() !== "" && taxaCambio.trim() !== "";
  }, [valorReais, taxaCambio]);

  function calcular() {
    setErroValor("");
    setErroTaxa("");

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
      setSnack({ visivel: true, msg: "Corrija os campos." });
      return;
    }

    const convertido = converterMoeda(v, t);
    setResultado(convertido);
    setSnack({ visivel: true, msg: "Conversão realizada!" });
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Title title="Conversão de Moeda" />
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
              <Text variant="titleMedium">
                Resultado: {resultado.toFixed(2)}
              </Text>
            </View>
          )}

        </Card.Content>
      </Card>

      <Snackbar
        visible={snack.visivel}
        onDismiss={() => setSnack({ visivel: false, msg: "" })}
        duration={2000}
      >
        {snack.msg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F6F7FB"
  },
  card: {
    borderRadius: 16
  },
  input: {
    marginTop: 10
  },
  button: {
    marginTop: 16
  },
  resultBox: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#EEF1FF",
    borderRadius: 12
  }
});
