
import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Card } from 'react-native-elements';

let newsData;

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            selectedCountry: 'in'
        }
    }

    componentDidMount() { this.getData('in'); }
    state = {
        'getdata': '',
    }

    getData = (country_id) => {

        return fetch('https://newsapi.org/v2/top-headlines?country=' + country_id + '&apiKey=070f5c0e8fec458e92742cf662fad9fd')
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == 'ok') {
                    newsData = responseJson.articles;
                    this.setState(responseJson.articles)
                } else {
                    Alert.alert(
                        '',
                        'Record Not Found',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    )
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        data = this.state.getdata;

        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Picker
                        selectedValue={this.state.selectedCountry}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ selectedCountry: itemValue })
                            this.getData(itemValue)
                        }} >

                        <Picker.Item label="India" value="in" />
                        <Picker.Item label="USA" value="us" />

                    </Picker>
                </View>

                <FlatList
                    data={newsData}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(item.url).catch(err => console.error('An error occurred', err));
                        }} >
                            <Card
                                title={item.source.name}
                                titleStyle={styles.CardItemTitle}
                                image={{ uri: item.urlToImage }}
                                containerStyle={styles.cardContainerStyle}
                            >
                                <View style={{ flex: 1, flexDirection: 'row' }}>

                                    <Text style={{ flex: 0.4 }}>
                                        {'Title'}
                                    </Text>
                                    <Text style={{ color: '#000', flex: 0.6 }}>
                                        {item.title}
                                    </Text>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={{ flex: 0.4 }}>
                                        {'Description'}
                                    </Text>
                                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: '#000', flex: 0.6 }}>
                                        {item.description}
                                    </Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={{ flex: 0.4 }}>
                                        {'Published'}
                                    </Text>
                                    <Text style={{ color: '#000', flex: 0.6 }}>
                                        {item.publishedAt}
                                    </Text>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={{ flex: 0.4 }}>
                                        {'Content'}
                                    </Text>
                                    <Text style={{ color: '#000', flex: 0.6 }}>
                                        {item.content}{' '}
                                    </Text>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'row' }}>

                                    <Text style={{ flex: 0.4 }}>
                                        {'Author'}
                                    </Text>
                                    <Text style={{ color: '#000', flex: 0.6 }}>
                                        {item.author}
                                    </Text>
                                </View>

                            </Card>
                        </TouchableOpacity>

                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    CardItemTitle: {
        fontSize: 14,
        color: '#CC3172',
        padding: 0,
        fontWeight: '100',
        margin: 0
    },
    cardContainerStyle: {
        borderRadius: 6,
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
        marginTop: 2
    }
});
