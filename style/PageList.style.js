import { StyleSheet, Dimensions } from "react-native";

let { height } = Dimensions.get('window')

export default StyleSheet.create({
    colorBlue: {
        backgroundColor: 'yellow'
    },
    paddingTopSB: {
        paddingTop: 24.1,
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
        top: height - 48,
        alignSelf: "center"
    }
});