import { useState } from "react";
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
      setNome('')
      setEmail('')
      setCelular('')
      setCpf('')
      setCep('')
      setRua('')
      setComplemento('')
      setBairro('')
      setCidade('')
      setEstado('')
      setSenha('')
      navigation.navigate("Login");
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Seja Bem vindo</Text>
        <Text style={styles.titulo}>Faça seu cadastro</Text>
        <Text>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        ></TextInput>

        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        ></TextInput>

        <Text>Celular:</Text>
        <TextInput
          style={styles.input}
          placeholder="Celular"
          value={celular}
          onChangeText={setCelular}
        ></TextInput>

        <Text>CPF:</Text>
        <TextInput
          style={styles.input}
          placeholder="cpf"
          value={cpf}
          onChangeText={setCpf}
        ></TextInput>

        <Text>CEP:</Text>
        <TextInput
          style={styles.input}
          placeholder="cep"
          value={cep}
          onChangeText={setCep}
        ></TextInput>

        <Text>Rua:</Text>
        <TextInput
          style={styles.input}
          placeholder="Rua"
          value={rua}
          onChangeText={setRua}
        ></TextInput>

        <Text>Complemento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Complemento"
          value={complemento}
          onChangeText={setComplemento}
        ></TextInput>

        <Text>Bairro:</Text>
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          value={bairro}
          onChangeText={setBairro}
        ></TextInput>

        <Text>Cidade:</Text>
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={cidade}
          onChangeText={setCidade}
        ></TextInput>

        <Text>Estado:</Text>
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={estado}
          onChangeText={setEstado}
        ></TextInput>

        <Text>Senha:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
        ></TextInput>

        <TouchableOpacity style={styles.button} onPress={handleCad}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
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
});
