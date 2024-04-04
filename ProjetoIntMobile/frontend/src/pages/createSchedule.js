import React, { useEffect, useState } from 'react';
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
import { Picker } from '@react-native-picker/picker';

export default function CreateSchedule() {

    const [dentistList, setDentistList] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [dentist, setDentist] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        async function getDentists() {
            try {
                const resposta = await apiDental.get('/ListarDentistas');
                setDentistList(resposta.data);
            } catch (error) {
                console.log(error);
            }
        }
        getDentists();
    }, []);

    return (
        <>
            <Text>Agendamento</Text>
            <Picker
                selectedValue={dentist}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue, itemIndex) => setDentist(itemValue)}
            >
                <Picker.Item label="Selecione o profissional" value="" />
                {dentistList.map((dado, index) => (
                    <Picker.Item
                        key={index}
                        label={dado.name}
                        value={dado.id}
                    />
                ))}
            </Picker>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        flex: 1
    }
});
