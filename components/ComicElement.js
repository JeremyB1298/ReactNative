import React, { Component } from "react";
import { Image, Overlay } from "react-native-elements";

import styles from "../style/Comic.style";

import { View, Text, TouchableOpacity, Dimensions } from "react-native";

class ComicElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: null,
      imagePressed: false
    };
  }

  componentDidMount() {
    //console.log(this.props.resource+ '?apikey=673d23d837a3c5a7be3dd08708c919c1');
    fetch(this.props.resource + "?apikey=673d23d837a3c5a7be3dd08708c919c1", {
      headers: {
        Referer: "localhost"
      }
    })
      .then(responseJson => responseJson.json())
      .then(json => {
        //console.log("json : ", json.data.results[0]);
        this.setState({
          comic: json.data.results[0]
        });
      });
  }

  imagePressed() {
    this.setState({
      imagePressed: !this.state.imagePressed
    });
  }

  render() {
    var image =
      this.state.comic &&
      this.state.comic.thumbnail.path +
        "." +
        this.state.comic.thumbnail.extension;
    let window = Dimensions.get("window");
    //console.log(image);
    return (
      <TouchableOpacity onPress={() => this.imagePressed()}>
        <View style={styles.comicView}>
          <Overlay
            isVisible={this.state.imagePressed}
            onBackdropPress={() => this.setState({ imagePressed: false })}
            width="auto"
            height="auto"
          >
            <Image source={{ uri: image }} style={styles.detailImageComic} />
          </Overlay>
          <Image source={{ uri: image }} style={styles.detailImageComicTable} />
          <Text style={styles.detailComicTitle}>
            {this.state.comic && this.state.comic.title}{" "}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ComicElement;
