import { TouchableOpacity, View, Text } from "react-native";
import styles from "./style";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";

type ButtonProps = {
  title?: string;
  type?: "cadastro" | "login";
  dados: {
    email: string;
    password: string;
  };
};

export default function Button({ title, type, dados }: ButtonProps) {
  const cadastro = async () => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        dados.email,
        dados.password
      );

      alert(`Usuário cadastrado: ${dados.email}`);

      const token = await credential.user.getIdToken();
      console.log(token);
    } catch (error: any) {
      alert("Usuário NÃO cadastrado");
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        dados.email,
        dados.password
      );

      alert(`Usuário logado: ${dados.email}`);

      const token = await credential.user.getIdToken();
      console.log(token);
    } catch (error: any) {
      alert("Usuário NÃO logado");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={type === "cadastro" ? cadastro : login}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}