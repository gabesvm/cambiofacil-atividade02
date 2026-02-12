import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import { normalizarNumero, validarPositivo, calcularLucroTotal, calcularMargemPercentual } from "../../src/utils/regras";

export default function Lucro() {
  const [custo, setCusto] = useState("12");
  const [preco, setPreco] = useState("20");
  const [quantidade, setQuantidade] = useState("5");

  const [resultado, setResultado] = useState<string | null>(null);

  function calcular() {
    const c = normalizarNumero(custo);
    const p = normalizarNumero(preco);
    const q = normalizarNumero(quantidade);

    if (!validarPositivo(c).ok || !validarPositivo(p).ok || q <= 0) {
      setResultado("Preencha corretamente.");
      return;
    }

    const lucro = calcularLucroTotal(p, c, q);
    const margem = calcularMargemPercentual(p, c);

    setResultado(
      `Lucro Total: R$ ${lucro.toFixed(2)} | Margem: ${margem.toFixed(2)}%`
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Cálculo de Lucro" />
        <Card.Content>

          <TextInput label="Custo" mode="outlined" keyboardType="numeric" value={custo} onChangeText={setCusto} style={styles.input}/>
          <TextInput label="Preço de Venda" mode="outlined" keyboardType="numeric" value={preco} onChangeText={setPreco} style={styles.input}/>
          <TextInput label="Quantidade" mode="outlined" keyboardType="numeric" value={quantidade} onChangeText={setQuantidade} style={styles.input}/>

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
