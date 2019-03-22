import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import ComicList from "./components/ComicList";

import styles from "./style/Comic.style";

class PageDetails extends Component {
  state = {
    character: null
  };

  componentDidMount() {
    //console.log('https://gateway.marvel.com' + '/v1/public/characters/1011334?apikey=' + '28eaf05072bfa7e8bd854d769e3dd9de')
    fetch(
      "http://gateway.marvel.com/v1/public/characters/1009144?apikey=28eaf05072bfa7e8bd854d769e3dd9de",
      {
        headers: {
          Referer: "localhost"
        }
      }
    )
      .then(responseJson => responseJson.json())
      .then(json => {
        this.setState({
          character: json.data.results[0]
        });
      })
      .catch(() => {
        console.log("error");
      });
  }

  render() {
    var image =
      this.state.character &&
      this.state.character.thumbnail.path +
      "." +
      this.state.character.thumbnail.extension;
    return this.state.character ? (
      <ScrollView style={styles.detailView}>
        <View style={styles.detailTitleView}>
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri: image
            }}
          />
          <Text style={styles.detailTitleCharacter}>
            {" "}
            {this.state.character.name}{" "}
          </Text>
          <Text style={styles.detailDescriptionCharacter}>
            {" "}
            {this.state.character.description}{" "}
          </Text>
        </View>

        <ComicList list={this.state.character.comics.items} />
      </ScrollView>
    ) : null;
  }
}

export default PageDetails;
