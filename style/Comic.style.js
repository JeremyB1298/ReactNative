import { StyleSheet, StatusBar } from "react-native";
import { Dimensions } from "react-native";

let window = Dimensions.get("window");

export default StyleSheet.create({
  comicView: {
    alignItems: "center",
    width: window.width / 4
  },

  detailView: {
    flex: 1
  },

  detailComicView: {
    flex: 3
  },

  detailTitleView: {
    alignItems: "center",
    width: window.width,
    marginBottom: 20,
    marginTop: 20 + StatusBar.currentHeight
  },

  detailComicTitle: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 5
  },
  detailImageComic: {
    width: window.width / 1.25,
    height: window.height / 1.5
  },
  detailTitleCharacter: {
    fontSize: 30,
    fontWeight: "bold"
  },
  detailDescriptionCharacter: {
    width: window.width / 1.25,
    textAlign: "center"
  },
  detailImageComicTable: {
    width: window.width / 4 - 20,
    height: 110
  },
  message: {
    alignSelf: "center",
    margin: 8,
    color: "gray"
  }
});
