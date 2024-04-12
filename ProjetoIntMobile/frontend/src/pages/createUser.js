import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import apiDental from "../services/apiDental";
import { useNavigation } from '@react-navigation/native';

export default function CadUser() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [senha, setSenha] = useState("");

  const navigation = useNavigation();

  async function handleCad() {
    try {
      const resposta = await apiDental.post("/CriarUsuario", {
        nome,
        email,
        celular,
        cpf,
        cep,
        rua,
        complemento,
        bairro,
        cidade,
        estado,
        senha,
      });
      clearFields();
      navigation.navigate("Login");
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  const clearFields = () => {
    setNome('');
    setEmail('');
    setCelular('');
    setCpf('');
    setCep('');
    setRua('');
    setComplemento('');
    setBairro('');
    setCidade('');
    setEstado('');
    setSenha('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <>
        <StatusBar style="auto" />
        <Text style={styles.logo}>AppDental</Text>
        <Text style={styles.cad}>Faça seu cadastro</Text>
        <ScrollView>
          <Text style={styles.inputField}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.inputField}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputField}>Celular:</Text>
          <TextInput
            style={styles.input}
            placeholder="Celular"
            value={celular}
            onChangeText={setCelular}
          />

          <Text style={styles.inputField}>CPF:</Text>
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
          />

          <Text style={styles.inputField}>CEP:</Text>
          <TextInput
            style={styles.input}
            placeholder="CEP"
            value={cep}
            onChangeText={setCep}
          />

          <Text style={styles.inputField}>Rua:</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua"
            value={rua}
            onChangeText={setRua}
          />

          <Text style={styles.inputField}>Complemento:</Text>
          <TextInput
            style={styles.input}
            placeholder="Complemento"
            value={complemento}
            onChangeText={setComplemento}
          />

          <Text style={styles.inputField}>Bairro:</Text>
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={bairro}
            onChangeText={setBairro}
          />

          <Text style={styles.inputField}>Cidade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={cidade}
            onChangeText={setCidade}
          />

          <Text style={styles.inputField}>Estado:</Text>
          <TextInput
            style={styles.input}
            placeholder="Estado"
            value={estado}
            onChangeText={setEstado}
          />

          <Text style={styles.inputField}>Senha:</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.buttonact} onPress={handleCad}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </>
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
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    color: "black",
    backgroundColor: "#23e3f3",
    padding: 10,
    borderTopLeftRadius: 15,
    textAlign: "center",  // Centralizar o texto
  },
  cad: {
    fontSize: 24,
    marginBottom: 20,
    color: "black",
    backgroundColor: "#23e3f3",
    padding: 10,
    borderTopLeftRadius: 15,
    textAlign: "center",  // Centralizar o texto
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
  logo: {
    fontSize: 25,
    marginBottom: 50,
    backgroundColor: "#23e3f3",
    marginTop: 20,
  },
});
