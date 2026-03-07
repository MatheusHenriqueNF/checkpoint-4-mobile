import { View, Text } from "react-native";
import styles from "./style";
import Button from "./components/Button/button";
import Input from "./components/Input/input";
import { useState } from "react";
import { useRouter } from "expo-router";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../services/firebase";

export default function Home() {
  const route = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [erroLocal, setErroLocal] = useState<string | null>(null);

  function validarCampos() {


    const e = email.trim();
    const p = password.trim();

    if (!e && !p) {
      setErroLocal("E-mail e senha são obrigatórios.");
      return false;

    } else if (!e) {
      setErroLocal("E-mail é obrigatório.");
      
      return false;

    } else if (!p) {
      
      setErroLocal("Senha é obrigatória.");
      return false;
    }

    setErroLocal(null);
    
    
    return true;
  
  
  }

  function mensagemAmigavelFirebase(error: unknown) {
    if (!(error instanceof FirebaseError)) {
      return "Ocorreu um erro inesperado. Tente novamente.";
    }

    const code = error.code;

    if (code === "auth/email-already-in-use") {
      return "Esse e-mail já está em uso. Tente fazer login ou use outro e-mail.";
    } 
    
    else if (code === "auth/invalid-email") {
      return "E-mail inválido. Verifique e tente novamente.";
    } 
    


    else if (code === "auth/weak-password") {
      return "Senha fraca. Use pelo menos 6 caracteres.";
    } 
    
    else if (code === "auth/user-not-found") {
      return "Usuário não encontrado. Verifique o e-mail ou crie uma conta.";
    } 
    
    
    else if (code === "auth/wrong-password") {
      return "Senha incorreta. Tente novamente.";
    } 
    
    else if (code === "auth/invalid-credential") {
      return "Credenciais inválidas. Verifique e-mail e senha.";
    } 
    else if (code === "auth/network-request-failed") {
      
      return "Sem conexão com a internet. Verifique sua rede e tente novamente.";
    } 
    
    else if (code === "auth/too-many-requests") {
      return "Muitas tentativas. Aguarde um pouco e tente novamente.";
    }

    return `Erro ao autenticar (${code}). Tente novamente.`;
  }

  async function cadastrar() {
    if (!validarCampos()) return;

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await credential.user.getIdToken();
      console.log("TOKEN:", token);

      route.push({
        pathname: "../src/Cadastro/cadastro",
        params: { email },
      });
    } 
    
    
    catch (error) {

      const msgAmigavel = mensagemAmigavelFirebase(error);
      const msgFirebase = error instanceof FirebaseError ? error.message : String(error);

      console.log("Erro Firebase (cadastro):", msgFirebase);

      route.push({
        pathname: "../src/CadastroError/cadastoerror",
        params: {
          mensagem: msgAmigavel,
          erro: msgFirebase,     
        },
      });
    }

  }

  async function logar() {
    if (!validarCampos()) return;

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await credential.user.getIdToken();
      console.log("TOKEN:", token);

      route.push({
        pathname: "../src/Logado/logado",
        params: { email },
      });
    } 
    
    catch (error) {
    
    
      const msgAmigavel = mensagemAmigavelFirebase(error);
      const msgFirebase = error instanceof FirebaseError ? error.message : String(error);

      console.log("Erro Firebase (login):", msgFirebase);

      route.push({
        pathname: "../src/LogadoError/logadoerror",
        params: {
          mensagem: msgAmigavel,
          erro: msgFirebase,
        },
      });
    }


  }

  return (
    
    
    <View style={styles.container}>
    
      <Input placeholder="Digite o seu email" value={email} onChangeText={setEmail} />
      <Input placeholder="Digite a sua senha" value={password} onChangeText={setPassword} secureTextEntry />

      {erroLocal && <Text style={{ color: "red", marginTop: 8 }}>{erroLocal}</Text>}

      <Button title="Cadastrar" onPress={cadastrar} />
    
      <Button title="Login" onPress={logar} />
    
    
    </View>
  
);
}