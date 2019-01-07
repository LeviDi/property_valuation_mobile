import React, { Component } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Modal,
    Text
} from 'react-native'

const Loading = ({ loading, progressoInicio, progressoFim }) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => { }}>
        <View style={[styles.container]}>
            <ActivityIndicator size="large" color="#0000ff" />
            {progressoInicio && progressoFim ? <Text style={styles.info}>{progressoInicio} de {progressoFim}</Text> : null}
        </View>
    </Modal>
)

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "rgba(211, 211, 211, 0.8)"
    },
    info: {

        padding: 40
    }
})
