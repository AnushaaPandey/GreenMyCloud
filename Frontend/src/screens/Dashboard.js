import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

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
                console.error('Error fetching articles:', error);
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
        <View style={styles.container}>
            <Text style={styles.heading}>Previous Articles</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#000000" />
            ) : (
                <FlatList
                    data={articles}
                    renderItem={renderArticleItem}
                    keyExtractor={(item) => item.url}
                />
            )}
        </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    articleItem: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    articleSource: {
        fontSize: 14,
        color: '#666',
    },
});

export default Dashboard;
