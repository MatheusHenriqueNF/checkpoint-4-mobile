import { View } from "react-native";
import styles from "./style";
import Button from "./components/Button/button";
import Input from "./components/Input/input";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dados = {
    email,
    password,
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Digite o seu email"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        placeholder="Digite a sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button title="Cadastrar" type="cadastro" dados={dados} />
      <Button title="Login" type="login" dados={dados} />
    </View>
  );
}