import { Text, View } from 'react-native';
import styles from './style';
import { useLocalSearchParams } from 'expo-router';

export default function LogadoError() {
    const { erro } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text>Erro de login</Text>
            <Text>{erro}</Text>
        </View>
    );
}