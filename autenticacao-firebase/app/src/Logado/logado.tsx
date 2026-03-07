import { Text, View } from 'react-native';
import styles from './style';
import { useLocalSearchParams } from 'expo-router';

export default function Logado() {
    const { email } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text>Usuário logado</Text>
            <Text>{email}</Text>
        </View>
    );
}