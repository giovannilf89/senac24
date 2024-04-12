import { StatusBar, StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";


export default function Dashboard() {
  const [user, setUser] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    async function handleName() {
      const iNome = await AsyncStorage.getItem("@nome");
      const nome = JSON.parse(iNome);
      setUser(nome);
    }
    handleName();
  }, []); // Remova user do array de dependências

  async function handleLogoff() {
    await AsyncStorage.removeItem("@nome");
    setUser('');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  function redirect() {
    navigation.navigate("CreateSchedule");
  }
  function redirect1() {
    navigation.navigate("ListSchedule");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <>
      <Text style={styles.logo}>AppDental</Text>
        <Text style={styles.bemvindo}>Seja bem-vindo, {user}</Text>
        <View style={styles.grupoMenu}>
          <TouchableOpacity style={styles.menu} onPress={redirect}>
            <Text style={styles.textoMenu}>Agende sua consulta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menu} onPress={redirect1}>
            <Text style={styles.textoMenu}>Agendamentos efetuados</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonSair} onPress={handleLogoff}>
          <Text>Sair</Text>
        </TouchableOpacity>
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
  bemvindo: {
    fontSize: 24,
    color: "black",
    backgroundColor: "#23e3f3",
    padding: 10,
    borderTopLeftRadius: 15,
  },
  dental: {
    fontSize: 24,
    marginBottom: 20,
    color: "black",
    backgroundColor: "#23e3f3",
    padding: 10,
    borderTopLeftRadius: 15,
  },
  login: {
    fontSize: 18,
    marginBottom: 20,
    color: "#23e3f3",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonSair: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 150,
    marginBottom: 20,
  },
  menu:{
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  textoMenu: {
    fontSize: 23,
  },
  grupoMenu:{
    margin: 15,
  },
  logo: {
    fontSize: 25,
    marginBottom: 50,
    backgroundColor: "#23e3f3",
  }
});
