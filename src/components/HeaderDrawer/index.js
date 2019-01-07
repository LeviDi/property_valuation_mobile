import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import metrics from '../../styles/metrics'
import fonts from '../../styles/fonts'

export default class Header extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                    <Icon name="menu" size={24} style={styles.icon} />
                </TouchableOpacity>
                <View style={styles.containerTitle}>
                    <Text style={[styles.title, fonts.h6Headeline]}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: metrics.headerPadding,
        height: metrics.headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary
    },
    containerTitle: {
        flexGrow: 1, marginRight: 30
    },
    title: {
        alignSelf: "center",
        color: colors.onPrimary
    },
    icon: {
        color: colors.onPrimary,
        paddingLeft: 5,
        paddingRight: 5,
    }
})

