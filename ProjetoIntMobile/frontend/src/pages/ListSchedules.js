import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button
} from "react-native";
import apiDental from "../services/apiDental";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const formatarData = (data) => {
  const date = new Date(data);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // Mês começa do zero, então adicionamos 1
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

export default function ListSchedule() {
  const [list, setList] = useState(null);  // Inicializa list como null
  const [id, setId] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    async function handleClientId() {
      const clienteId = await AsyncStorage.getItem("@clientId");
      const cliId = JSON.parse(clienteId);
      setId(cliId);
    }
    handleClientId();
  }, []);

  useEffect(() => {
    async function Listar() {
      try {
        if (!id) {
          return
        }
        const resposta = await apiDental.get(`/ListarClienteAgendamento/${id}`);
        setList(resposta.data);
      } catch (error) {
        console.log(error);
      }
    }
    Listar();
  }, [id, list]);

  async function handleDelete(id) {
    console.log('id do agendamento:', id);
    try {
      await apiDental.delete('/DeletarAgendamento', {
        data: {
          remove: id,
        }
      });
      navigation.navigate("Dashboard");
      console.log('Agendamento removido com sucesso');
    } catch (error) {
      console.log('Erro ao excluir agendamento:', error.response ? error.response.data : error.message);
    }
  }
  function handleVoltar() {
    navigation.navigate('Dashboard')
  }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Text>Agendamentos</Text>

        {/* Verifica se 'list' não é null antes de renderizar */}
        {list !== null ? (
          list.length > 0 ? (
            list.map((item, index) => (
              <React.Fragment key={index}>
                <Text style={styles.dateText}>{formatarData(item.date)}</Text>
                <Text>{item.time}</Text>
                <Text>{item.dentist.name}</Text>
                <Text>{item.client.name}</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}><Text>Cancelar Angedamento</Text></TouchableOpacity>
              </React.Fragment>
            ))
          ) : (
            <Text>Nenhum agendamento encontrado.</Text>
          )
        ) : (
          <Text>Carregando...</Text>
        )}
        <Button title="Voltar" onPress={() => { handleVoltar() }} />
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
