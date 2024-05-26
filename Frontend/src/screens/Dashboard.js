import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, ActivityIndicator, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');

function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:8000/scrape-articles/');
                const uniqueArticles = removeDuplicates(response.data, 'url');
                setArticles(uniqueArticles);
            } catch (error) {
                Alert.alert('Unexpected Error:', error.response?.data?.errors?.non_field_errors?.[0] || 'Error fetching articles');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const removeDuplicates = (arr, prop) => {
        return arr.filter((obj, index, self) =>
            index === self.findIndex((o) => o[prop] === obj[prop])
        );
    };

    const openArticleDetail = (url) => {
        Linking.openURL(url);
    };

    const renderArticleItem = ({ item }) => (
        <TouchableOpacity onPress={() => openArticleDetail(item.url)} style={styles.articleItem}>
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleSource}>{item.source}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#000000" />
            ) : (
                <>
                    <View style={styles.welcomeContainer}>
                    <Text style={styles.subHeading}>Previous Articles</Text>
                        {/* <Text style={styles.welcomeMessage}>Welcome, Check your carbon emissions now!!</Text> */}
                    </View>
                   
                    <FlatList
                        data={articles}
                        renderItem={renderArticleItem}
                        keyExtractor={(item) => item.url}
                    />
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        padding: 20,
    },
    // welcomeContainer: {
    //     alignItems: 'center',
    //     marginVertical: 20,
    // },
    // welcomeMessage: {
    //     fontSize: 20,
    //     color: '#333',
    //     textAlign: 'center',
    // },
    subHeading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#555',
    },
    articleItem: {
        paddingVertical: 10,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    articleSource: {
        fontSize: 14,
        color: '#555',
    },
});

export default Dashboard;
