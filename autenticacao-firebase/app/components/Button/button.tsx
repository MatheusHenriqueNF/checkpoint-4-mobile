import { TouchableOpacity, View, Text } from "react-native";
import styles from "./style";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../../services/firebase";
import { useRouter } from "expo-router";
import { useState } from "react";

type ButtonProps = {
  title?: string;
  type?: "cadastro" | "login";
  dados: { email: string; password: string };
};

export default function Button({ title, type, dados }: ButtonProps) {
  const route = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const cadastro = async () => {
    setErrorMsg(null);
    try {
      const credential = await createUserWithEmailAndPassword(auth, dados.email, dados.password);

      const token = await credential.user.getIdToken();
      console.log(token);

      route.push({ pathname: "../src/Cadastro/cadastro", params: { email: dados.email } });
    } catch (error: any) {
      route.push({ pathname: "../src/CadastroError/cadastoerror", params: { erro: error.message } });
    }
  };

  const login = async () => {
    setErrorMsg(null);
    try {
      const credential = await signInWithEmailAndPassword(auth, dados.email, dados.password);

      const token = await credential.user.getIdToken();
      console.log(token);

      route.push({ pathname: "../src/Logado/logado", params: { email: dados.email } });
    } catch (error: any) {
      route.push({ pathname: "../src/LogadoError/logadoerror", params: { erro: error.message } });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={type === "cadastro" ? cadastro : login}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>

    </View>
  );
}