import React from "react";
import ComicElement from "./ComicElement";
import { View, Text, FlatList, Dimensions } from "react-native";

import styles from "../style/Comic.style";

class ComicList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.detailComicView}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.props.list}
          renderItem={({ item }) => (
            <ComicElement
              key={item.id}
              resource={item.resourceURI}
              name={item.title}
            />
          )}
          numColumns={4}
        />
      </View>
    );
  }
}

export default ComicList;
