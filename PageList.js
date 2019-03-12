//Base
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
//CSS
import styles from "./css/PageList.style";
//Custom Components


class PageList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            characters: [
                {
                    id: 10552,
                    name: '3D-Man',
                    description: 'The best dimensional man in town'
                },
                {
                    id: 75542,
                    name: 'Spiderman',
                    description: 'The spider of wonders'
                },
                {
                    id: 2665,
                    name: 'Thor',
                    description: 'Gods play too'
                },
            ],
            searchVal: ''
        }
    }

    updateSearch = (searchVal) => {
        this.setState({ searchVal });
        console.log(searchVal)
    }

    render() {
        return (
            <View style={styles.paddingTopSB}>
                <SearchBar
                    placeholder="Rechercher..."
                    onChangeText={this.updateSearch}
                    value={this.state.searchVal}
                    platform="default"
                    showLoading={false}
                    lightTheme={true}
                />
                <FlatList
                    data={this.state.characters}
                    renderItem={({ item }) =>
                        <ListItem
                            key={item.id}
                            leftAvatar={require('./images.png')}
                            title={item.name}
                            subtitle={item.description}
                        />
                    }
                />
            </View>
        )
    }
}

export default PageList