
import React, {Component} from 'react';
import { View, Text } from 'react-native';

class PageDetails extends Component {

    state = {
            character: null
        }

    componentDidMount() {
        console.log('https://gateway.marvel.com' + '/v1/public/characters/1011334?apikey=' + '28eaf05072bfa7e8bd854d769e3dd9de')
        fetch('http://gateway.marvel.com/v1/public/characters/1011334?apikey=673d23d837a3c5a7be3dd08708c919c1', {
            headers : {
                Referer: 'localhost'
            }
        }).then(responseJson =>
           responseJson.json()
         ).then(json => {
           this.setState({
             character: json.data.results[0]
           })

         }).catch(() => {
             console.log("error")
         })

     }

    render(){
        
        return(
            <View>
                <Text> { this.state.character && this.state.character.name } </Text>
            </View>
        );
    }

} 

export default PageDetails