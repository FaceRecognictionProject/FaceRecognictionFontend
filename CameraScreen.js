'use strict';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {RNCamera} from 'react-native-camera';
//import outImage from './Component/outImage.js';


const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);
export default class CameraScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      cameraType: 'back',
      mirrorMode: false,
      dataJson: [],
    };
    
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <RNCamera
          //type={this.state.type}
          style={styles.preview}
          type={RNCamera.Constants.Type.front} //set camera front
          flashMode={RNCamera.Constants.FlashMode.off} //flash on.off
          type={this.state.cameraType}
          mirrorImage={this.state.mirrorMode}
          faceDetectionLandmarks={
            RNCamera.Constants.FaceDetection.Landmarks.all
          }
          onFacesDetected={this.onFacesDetected}
          onFaceDetectionError={this.onFaceDetectionError}  
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status, recordAudioPermissionStatus}) => {
            if (this.onFacesDetected) {
              this.onFacesDetected;
              //console.log('Faces detection success:');
              //this.takePicture(camera);
            } else {
              this.onFaceDetectionError;
            }
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={styles.views}>
                <TouchableOpacity
                  onPress={() => this.changeCameraType()}
                  style={styles.flip}>
                  <Text style={{fontSize: 14}}> FLIP </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => 
                    this.takePicture(camera)
                  }
                  
                  style={styles.capture}>
                  <Text style={{fontSize: 14}}> Capture </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
  changeCameraType() {
    if (this.state.cameraType === 'back') {
      this.setState({
        cameraType: 'front',
        mirrorMode: true
      });
    } else {
      this.setState({
        cameraType: 'back',
        mirrorMode: false
      });
    }
  }
  //onFacesDetected = ({faces}) => console.log('Faces detection success:', faces);
  onFacesDetected = async function(faces) {
    //console.log('Faces detection success:', faces.Object);
  };
  onFaceDetectionError = async function(state) {
    //console.log('Faces detection error:', state);
  };
  takePicture = async function(camera) {
    const options = {width:720, quality: 1, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
    const formData = new FormData();
    formData.append('image', {
      uri: data.uri,
      type: 'image/jpg', // or photo.type
      name: 'testPhotoName',
    });
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imagedata: data.base64,
        width: data.width,
        height: data.height
      })
    };
    console.log(config.body);
    fetch('http://192.168.43.229:5000/api/face_recogni', config)
    .then((response) => response.json())
      .then((responseJsonData) => {
        this.setState({ 
          dataJson: responseJsonData
        });
        //console.log(this.state.dataJson)
        console.log("Successfully", this.state.dataJson);
        this.props.navigation.navigate('Detail', { 
          Datas: this.state.dataJson
        });
        console.log(Datas)
        //return responseJsonData;
      })
      .catch (err => {
        console.log("Error!!!",err)
      })  
  };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  flip: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 30,
  },
  views:{
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});


