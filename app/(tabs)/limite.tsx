import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, TextInput, Button, HelperText } from "react-native-paper";
import { normalizarNumero, validarPositivo, calcularLimiteOperacao, operacaoPermitida } from "../../src/utils/regras";

export default function Limite() {
  const [saldo, setSaldo] = useState("1000");
  const [percentual, setPercentual] = useState("30");
  const [valorOperacao, setValorOperacao] = useState("200");

  const [resultado, setResultado] = useState<string | null>(null);
  const [erro, setErro] = useState("");

  function calcular() {
    setErro("");

    const s = normalizarNumero(saldo);
    const p = normalizarNumero(percentual);
    const v = normalizarNumero(valorOperacao);

    if (!validarPositivo(s).ok || !validarPositivo(v).ok || p <= 0 || p > 100) {
      setErro("Preencha os campos corretamente.");
      setResultado(null);
      return;
    }

    const limite = calcularLimiteOperacao(s, p);
    const pode = operacaoPermitida(v, limite);

    setResultado(
      `Limite: R$ ${limite.toFixed(2)} | Operação ${pode ? "Permitida" : "Bloqueada"}`
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Limite de Operação" />
        <Card.Content>

          <TextInput label="Saldo" mode="outlined" keyboardType="numeric" value={saldo} onChangeText={setSaldo} style={styles.input}/>
          <TextInput label="Percentual (%)" mode="outlined" keyboardType="numeric" value={percentual} onChangeText={setPercentual} style={styles.input}/>
          <TextInput label="Valor da Operação" mode="outlined" keyboardType="numeric" value={valorOperacao} onChangeText={setValorOperacao} style={styles.input}/>

          <HelperText type="error" visible={!!erro}>{erro}</HelperText>

          <Button mode="contained" onPress={calcular} style={styles.button}>
            Calcular
          </Button>

          {resultado && (
            <Text style={styles.result}>
              {resultado}
            </Text>
          )}

        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F6F7FB" },
  card: { borderRadius: 16 },
  input: { marginTop: 10 },
  button: { marginTop: 16 },
  result: { marginTop: 20, fontWeight: "bold" }
});
