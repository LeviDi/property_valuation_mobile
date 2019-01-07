import { StyleSheet } from 'react-native'
import colors from '../../styles/colors';
import metrics from '../../styles/metrics';

export default styles = StyleSheet.create({
    container: {
        height: 31,
        backgroundColor: colors.secondary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        color: colors.onSecondary,
    },
})
