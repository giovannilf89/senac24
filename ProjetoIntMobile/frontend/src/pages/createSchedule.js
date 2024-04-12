import React, { useEffect, useState } from "react";
import {Text, TouchableOpacity, Button, Platform, Alert, SafeAreaView } from "react-native";
import apiDental from "../services/apiDental";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dashboard from '../pages/dashboard'
import styles from './styles'


export default function CreateSchedule() {
  const [dentistList, setDentistList] = useState([]);

  const [dentistId, setDentistId] = useState("")
  const [clientId, setClientId] = useState("")
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("07:00");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date(2024, 11, 31)); // Dezembro de 2024
  const hoursList = Array.from({ length: 13 }, (_, i) => `${i + 7}:00`);


  const navigation = useNavigation();

  useEffect(() => {
    async function handleClientId() {
      const clientId = await AsyncStorage.getItem("@clientId")
      const id = JSON.parse(clientId)
      setClientId(id)
    }
    handleClientId()
  }, [])


  useEffect(() => {
    async function fetchDentists() {
      try {
        const response = await apiDental.get("/ListarDentistas");
        setDentistList(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDentists();

    const today = new Date();
    let currentDate = new Date(today);

    // Encontrar a próxima segunda-feira
    while (currentDate.getDay() !== 1) {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setMinDate(currentDate);
  }, []);

  const onChangeDate = (event, date) => {
    const currentDate = date || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);

    // Verificar se a data selecionada é um domingo
    if (currentDate.getDay() === 0) {
      Alert.alert(
        'Atenção',
        'Não há atendimento aos domingos. Por favor, selecione outra data.',
        [{ text: 'OK', onPress: () => setShowDatePicker(true) }]
      );
    }
  };

  const onChangeTime = (itemValue, itemIndex) => {
    setTime(itemValue);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  async function handleAgendar() {
    try {
      const resposta = await apiDental.post('/CriarAgendamento', {
        date,
        time,
        clientId,
        dentistId
      });
      console.log('Agendamento criado com sucesso:', resposta.data);
      navigation.navigate(Dashboard)
    } catch (error) {
      console.log('Erro ao criar agendamento:', error.response ? error.response.data : error.message);
      Alert.alert(
        'Erro',
        'Não foi possível agendar. Por favor, tente novamente.',
        [{ text: 'OK' }]
      );
    }
  }

  function handleVoltar() {
    navigation.navigate('Dashboard')
  }

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Text style={styles.logo}>AppDental</Text>
        <Text>Agendamento</Text>
        <Text style={styles.inputField}>Selecione o profissional</Text>
        <Picker
          selectedValue={dentistId}
          style={{ height: 50, width: 200, borderWidth: 1, }}
          onValueChange={(itemValue, itemIndex) => setDentistId(itemValue)}
        >
          <Picker.Item label="Selecione o profissional" value="" />
          {dentistList.map((dado, index) => (
            <Picker.Item key={index} label={dado.name} value={dado.id} />
          ))}
        </Picker>
        <Text style={styles.inputField}>Selecione a data</Text>
        <TouchableOpacity style={styles.select} onPress={showDatepicker}><Text>Abrir Calendário</Text></TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            minimumDate={minDate}
            maximumDate={maxDate}
            onChange={onChangeDate}
          />
        )}
        <Text style={styles.data}>{date.toLocaleDateString()}</Text>

        <Text style={styles.inputField}>Selecione o horário:</Text>
        <Picker
          selectedValue={time}
          style={{ height: 50, width: 200 }}
          onValueChange={onChangeTime}
        >
          {hoursList.map((hour, index) => (
            <Picker.Item key={index} label={hour} value={hour} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.buttonact} onPress={() => { handleAgendar() }}><Text>Agendar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.buttonact} onPress={() => { handleVoltar() }}><Text>Voltar</Text></TouchableOpacity>
      </>
    </SafeAreaView>
  );
}

