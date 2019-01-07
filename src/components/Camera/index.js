import React, { Component } from 'react';

import {
    Platform,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RNCamera } from 'react-native-camera'

const DESIRED_RATIO = "16:9";

export default class Camera extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imagem: null,
            cameraType: RNCamera.Constants.Type.back,
            cameraTypeIcon: 'camera-rear',
            cameraFlash: RNCamera.Constants.FlashMode.auto,
            cameraFlashIcon: 'flash-auto'
        }
    }

    prepareRatio = async () => {
        if (Platform.OS === 'android' && this.camera) {
             const ratios = await this.camera.getSupportedRatiosAsync();

             // See if the current device has your desired ratio, otherwise get the maximum supported one
             // Usually the last element of "ratios" is the maximum supported ratio
             const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
             
             this.setState({ ratio });
        }
    }

    tirarFoto = () => {
        if (this.camera) {
            this.camera.takePictureAsync({forceUpOrientation: true, fixOrientation: true, quality: 1, width: 500, base64: true })
                .then((data) => {
                    this.props.callback(data)
                })
        }
    }

    trocarCamera = () => {
        if (this.camera) {
            let state = this.state
            if (this.state.cameraType == RNCamera.Constants.Type.back) {
                state.cameraType = RNCamera.Constants.Type.front
                state.cameraTypeIcon = 'camera-front'
            }
            else {
                state.cameraType = RNCamera.Constants.Type.back
                state.cameraTypeIcon = 'camera-rear'
            }
            this.setState(state)
        }
    }

    trocarFlash = () => {
        if (this.camera) {
            let state = this.state
            switch (this.state.cameraFlash) {
                case RNCamera.Constants.FlashMode.off:
                    state.cameraFlash = RNCamera.Constants.FlashMode.on
                    state.cameraFlashIcon = 'flash-on'
                    break;
                case RNCamera.Constants.FlashMode.on:
                    state.cameraFlash = RNCamera.Constants.FlashMode.auto
                    state.cameraFlashIcon = 'flash-auto'
                    break;
                case RNCamera.Constants.FlashMode.auto:
                    state.cameraFlash = RNCamera.Constants.FlashMode.torch
                    state.cameraFlashIcon = 'highlight'
                    break;
                case RNCamera.Constants.FlashMode.torch:
                    state.cameraFlash = RNCamera.Constants.FlashMode.off
                    state.cameraFlashIcon = 'flash-off'
                    break;
            }
            this.setState(state)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.camera}
                    ref={(camera) => {
                        this.camera = camera
                    }}
                    //onCameraReady={this.prepareRatio} 
                    //ratio={this.state.ratio}
                    

                    playSoundOnCapture={true}
                    type={this.state.cameraType}
                    flashMode={this.state.cameraFlash}
                    permissionDialogTitle="Permissao para usar a camera"
                    permissionDialogMessage="Solicitação de acesso a camera">
                    <View style={styles.controlArea}>
                        <View style={styles.botao}>
                            <TouchableOpacity style={{}} onPress={() => this.trocarFlash()}>
                                <Icon name={this.state.cameraFlashIcon} size={30} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botaoCamera}>
                            <TouchableOpacity style={{}} onPress={() => this.tirarFoto()}>
                                <Icon name="lens" size={60} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botao}>
                            <TouchableOpacity style={{}} onPress={() => this.trocarCamera()}>
                                <Icon name={this.state.cameraTypeIcon} size={30} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </RNCamera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    controlArea: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "flex-end",
        alignContent: "center",
        flexDirection: "row",
    },
    botaoCamera:{
        padding: 20,
        marginBottom: 3,
    },
    botao: {
        marginBottom: 15,
        padding: 20,
    },
    icon: {
        color: "#FFF"
    }
})