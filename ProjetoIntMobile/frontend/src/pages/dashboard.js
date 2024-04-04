import { StatusBar, StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CreateSchedule from "./createSchedule";


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
  }, [user]);

  async function handleLogoff() {
    await AsyncStorage.removeItem("@nome");
    setUser('')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  console.log

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>Seja bem-vindo, {user}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Schedule')}>
        <Text>Agende sua consulta!</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={handleLogoff}>
        <Text>Sair</Text>
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
});
