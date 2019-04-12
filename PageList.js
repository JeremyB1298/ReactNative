//Base
import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
//CSS
import styles from "./style/PageList.style";
//Custom Components


class PageList extends Component {
    static navigationOptions = {
        title: 'Marvel Search',
        headerTintColor: '#e61b23',
        headerRight: (
            <View style={styles.topBarIcon}>
                <Icon
                    name='star'
                    type='material'
                    color='#ffe100'
                    onPress={() => console.log('Favorites !')} />
            </View>
        )
    };
    constructor(props) {
        super(props)

        this.state = {
            characters: [],
            searchVal: '',
            offset: 0,
            loading: false,
            inSearch: false,
            isSearchLoading: false,
            favorites: []
        }
    }

    addOffset() {
        if (!this.state.inSearch) {
            this.setState({
                offset: this.state.offset + 20
            }, () => this.fetchDataFromAPI());
        }
    };

    fetchDataFromAPI = () => {
        if (this.state.inSearch) {
            this.setState({ isSearchLoading: true })
            fetch('http://gateway.marvel.com/v1/public/characters?apikey=28eaf05072bfa7e8bd854d769e3dd9de&offset=' + this.state.offset + "&nameStartsWith=" + this.state.searchVal, {
                headers: {
                    Referer: 'localhost'
                }
            }).then(responseJson =>
                responseJson.json()
            ).then(json => {
                this.setState({
                    characters: json.data.results,
                    isSearchLoading: false
                }, console.log("get with search"))
            }).catch((error) => {
                console.log("error fetching data: " + error)
            })
        } else {
            console.log("Loading data with offset " + this.state.offset)
            this.setState({ loading: true })
            fetch('http://gateway.marvel.com/v1/public/characters?apikey=28eaf05072bfa7e8bd854d769e3dd9de&offset=' + this.state.offset, {
                headers: {
                    Referer: 'localhost'
                }
            }).then(responseJson =>
                responseJson.json()
            ).then(json => {
                this.setState({
                    characters: this.state.characters
                        ? this.state.characters.concat(json.data.results)
                        : json.data.results,
                    loading: false
                }, console.log("get without search"))
            }).catch((error) => {
                console.log("error fetching data -> " + error)
            })
        }

    };

    componentDidMount() {
        this.fetchDataFromAPI()
        this.getAllFromFavorites()
    }

    updateSearch = (searchVal) => {
        this.setState({ searchVal })
    }

    trimDescription = (desc) => {
        if (desc.length > 80) {
            return desc.substring(0, 80) + "..."
        } else {
            return desc
        }

    }

    triggerSearch = () => {
        if (this.state.searchVal != "") {
            this.setState({ inSearch: true }, () => this.fetchDataFromAPI())
        } else {
            this.resetContext()
        }

    }

    resetContext = () => {
        this.setState({
            loading: false,
            inSearch: false,
            isSearchLoading: false,
            characters: [],
            offset: 0,
            searchVal: ''
        }, () => this.fetchDataFromAPI())

    }

    addToFavorites = (itemId) => {
        var favs = this.state.favorites
        favs.push(itemId)
        this.setState({ favorites: favs }, () => this.syncDataFavorites())
    }

    syncDataFavorites = async () => {
        try {
            await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.state.favorites));
        } catch (error) {
            console.log("Can't save with AsyncStorage", error)
        }
    }

    getAllFromFavorites = async () => {
        try {
            console.log("Fetching from asyncstorage")
            const value = await AsyncStorage.getItem('@MySuperStore:key');
            if (value != null) {
                // We have data!!
                console.log(JSON.parse(value))
                var favs = JSON.parse(value)
                this.setState({ favorites: favs })
            }
        } catch (error) {
            console.log("Can't load with AsyncStorage", error)
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const favorites = [1011334, 1009146];
        return (
            <View style={styles.globalView}>
                <SearchBar
                    placeholder="Rechercher..."
                    onChangeText={this.updateSearch}
                    onClear={() => this.resetContext()}
                    value={this.state.searchVal}
                    onEndEditing={() => this.triggerSearch()}
                    platform="default"
                    style={styles.searchBar}
                    showLoading={this.state.isSearchLoading}
                    lightTheme={true}
                />
                {this.state.characters.length != 0 ?
                    <FlatList
                        data={this.state.characters}
                        style={styles.characterFlatList}
                        onEndReachedThreshold={0.1}
                        onEndReached={({ distanceFromEnd }) => {
                            this.addOffset()
                        }}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => navigate('Detail', { id: item.id })} key={item.id}>
                                <ListItem
                                    key={item.id}
                                    leftAvatar={{ source: { uri: item.thumbnail.path + "." + item.thumbnail.extension } }}
                                    title={item.name}
                                    subtitle={this.trimDescription(item.description)}
                                    rightIcon={{
                                        name: this.state.favorites.includes(item.id) ? 'star' : 'star-border',
                                        type: 'material',
                                        color: '#ffe100',
                                        onPress: () => this.addToFavorites(item.id)
                                    }}
                                />
                            </TouchableOpacity>

                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                    :
                    <View>
                        {this.state.inSearch ? <Text style={styles.message}>Aucun héros trouvé...</Text> : <Text style={styles.message}>Chargement des données...</Text>}
                    </View>}

                {this.state.loading && !this.state.inSearch && <ActivityIndicator style={styles.loadingActivityIndicator} size="large" color="#E61B23" />}

            </View>
        )
    }
}

export default PageList