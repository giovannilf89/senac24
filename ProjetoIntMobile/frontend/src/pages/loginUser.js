import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import apiDental from "../services/apiDental";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();

  async function handleLogin() {
    try {
      const resposta = await apiDental.post("/LoginUsuario", {
        email,
        senha,
      });

      await AsyncStorage.setItem("@nome", JSON.stringify(resposta.data.nome));
      await AsyncStorage.setItem("@clientId", JSON.stringify(resposta.data.id));
      navigation.navigate("Dashboard");
      setEmail("");
      setSenha("");
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  function handleCadastrar() {
    navigation.navigate("CadUser");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.logo}>AppDental</Text>
      <Text style={styles.login}>Faça seu login</Text>
      <Text style={styles.inputField}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.inputField}>Senha:</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.buttonact} onPress={handleLogin}>
        <Text>Logar</Text>
      </TouchableOpacity>
      <Text>Novo por aqui? Crie seu cadastro</Text>
      <TouchableOpacity style={styles.buttonact} onPress={handleCadastrar}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 25,
    marginBottom: 50,
    backgroundColor: "#23e3f3",
  },
  login: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,

  },
  buttonact: {
    backgroundColor: "#23e3f3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 300,
    marginBottom: 20,
  },
});
