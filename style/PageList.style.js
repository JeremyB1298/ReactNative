import { StyleSheet, Dimensions } from "react-native";

let { height, width } = Dimensions.get('window')

export default StyleSheet.create({
    colorBlue: {
        backgroundColor: 'yellow'
    },
    globalView: {
        flex: 10
    },
    searchBar: {
        flex: 1
    },
    characterFlatList: {
        flex: 3
    },
    loadingActivityIndicator: {
        height: 30,
        margin: 8,
        position: "absolute",
        top: height / 1.25,
        alignSelf: "center"
    },
    message: {
        alignSelf: "center",
        margin: 8,
        color: "gray"
    },
    topBarIcon: {
        paddingRight: 15
    }
});