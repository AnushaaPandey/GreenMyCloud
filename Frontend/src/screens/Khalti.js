import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-rapi-ui';
import axios from 'axios';

export default function KhaltiScreen() {
    const [amount, setAmount] = useState('');
    const token = 'your-token';  // Retrieve your token as needed

    const handlePayment = () => {
        if (!token || !amount) {
            Alert.alert('Error', 'Token and amount are required');
            return;
        }

        axios.post(`http://10.0.2.2:8000/verify_payment/${token}/${amount}/`)
            .then(response => {
                if (response.data.success) {
                    Alert.alert('Success', 'Payment Successful');
                } else {
                    Alert.alert('Failed', `Payment Failed: ${response.data.message}`);
                }
            }).catch(error => {
                console.error('Payment Error: ', error);
                Alert.alert('Error', `Payment Error: ${error.message}`);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Khalti Payment</Text>
            <TextInput
                style={styles.input}
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />
            <Button title="Pay" onPress={handlePayment} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        width: '100%',
        padding: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
});
