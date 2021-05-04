import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonStyle}>
        <Button
          title="Detail"
          onPress={() =>
            this.props.navigation.navigate('Detail')
          }
        />
        </View>
        <View style={styles.buttonStyle}>
        <Button
          title="Camera"
          onPress={() =>
            this.props.navigation.navigate('Camera')
          }
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      /*flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      padding: 20,
      */
      flex: 1,
      padding: 20,
      //marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E0F7FA',
    },
    buttonStyle: {
      fontSize:22,
      padding: 5,
      marginVertical: 10,
      alignItems: 'center',
      minWidth: 250,
      marginTop: 20,

    },
  });
  
