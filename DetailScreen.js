
import React, { Component } from 'react';
import {Platform,  StyleSheet, Text, View, ScrollView, TextInput, Alert,FlatList,
  TouchableOpacity,} from 'react-native';

export default class DetailScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

/*
  componentDidMount() {
    fetch('http://10.80.8.98:5000/api/face_recogni')
      .then((response) => response.json())
      .then((responseJsonData) => {
        this.setState({ 
          dataJson: responseJsonData.Perplejson
        });
        console.log("Successfully",responseJsonData)
        //return responseJsonData;
      })
      .catch (err => {
        console.log("Error!!!",err)
      })  
  }**/

  render() {
    //const { navigation } = this.props;
    person = this.props.route.params.Datas;
    console.log(person);
    //console.log(person);
    return (
      <View style={styles.container}>
         <Text style={{fontSize:30}}>คุณคือ</Text>
        <View style={styles.textStyle}> 
          <Text style={{ fontSize:20}}>ชื่อ: {person.IDname}</Text>
          <Text style={{ fontSize:20}}>นามสกุล: {person.lastname}</Text>
          <Text style={{ fontSize:20}}>อายุ: {person.age}</Text>
          <Text style={{ fontSize:20}}>ความแม่นยำ: {(person.prob*100).toFixed(2)+'%'}</Text>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding:10
  },
  buttonView: {
  flexDirection: 'row'
  },
  textStyle: {
  color: 'black',
  padding:15
  }
});
/*
function Person() {
  return this.props.route.params.xxx;
}*/
