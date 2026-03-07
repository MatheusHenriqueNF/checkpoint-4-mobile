import { Text, View } from 'react-native';
import styles from './style';
import { useLocalSearchParams } from 'expo-router';

export default function LogadoError() {

    const { mensagem, erro } = useLocalSearchParams<{
    mensagem?: string;
    erro?: string;
  }>();

  return (

    <View style={styles.container}>
      <Text>Erro de login</Text>

            <Text>{mensagem ?? "Não foi possível concluir. Tente novamente."}</Text>


      
      <Text style={{ marginTop: 10 }}>
        Detalhes (Firebase): {erro}
      </Text>
    </View>
  );
}