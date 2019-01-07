import { StyleSheet } from 'react-native'
import colors from '../../styles/colors';
import metrics from '../../styles/metrics';
import fonts from '../../styles/fonts';

export default styles = StyleSheet.create({
    container: {
        padding: metrics.padding,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: colors.lighter,
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center"
      },
    
      profileContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: colors.lighter,
        paddingBottom: 15
      },
    
      avatar: {
        width: 68,
        height: 68,
        borderRadius: 34,
        marginRight: metrics.padding,
      },
    
      profileInfo: {
        flex: 1,
      },
    
      /*
      name: {
        fontWeight: 'bold',
        fontSize: fonts.big,
        color: colors.darker,
        marginTop: 5,
      },
    
      bio: {
        fontSize: fonts.regular,
        color: colors.regular,
        marginTop: 5,
      },
    */
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
      },
    
      firstButton: {
        marginRight: 10,
      },

      logou: {
        marginRight: 10,
      }
})
