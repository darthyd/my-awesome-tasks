import { View, Text, StyleSheet } from 'react-native';

export default function Register() {
    return (
        <View style={styles.container}>
            <Text>AddTask</Text>
        </View>
    )
}

StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    }
})

