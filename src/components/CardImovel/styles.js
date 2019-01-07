import { StyleSheet } from 'react-native'
import colors from '../../styles/colors';
import metrics from '../../styles/metrics';

export default styles = StyleSheet.create({

    container: {
        flex:1,
        marginTop:10,
        marginBottom: 10,
        borderRadius: 2,
        backgroundColor: colors.surface,     
    },
    containerTitle:{
        paddingLeft: 25,
        paddingBottom:5,
        paddingTop:5,
        marginTop: 20,
        marginBottom: 25
    },
    title:{
        fontWeight: '700', 
        fontSize: 22
    },
    containerDescription:{
        backgroundColor: 'rgba(220,220,220, 0.2)',
        paddingLeft: 25,
        paddingTop: 10,
        paddingBottom:10,
        borderRadius: 2,
        marginTop:10,
        marginRight:22,
        marginLeft:22
    },
    containerCarousel: {
        height: 130,
        marginLeft: 0,
        marginRight: 0,
        flexDirection: "row",
        alignItems: "center",       
    },
    imagemContainer: {
        height: 150,
        marginLeft: 30,
        marginRight: 30,
    },
    imagem: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover"//contain//center
    },

    header: {
        flex: 1,
        backgroundColor: "#fff"
    },
    
    titulo: {
        
        fontWeight: "600",
        color: colors.primary,
        margin: 15
    },
    subTitulo: {
        
        margin: 15
    },
    tituloDetalhes: {
        flex: 1,
        margin: 15,
        
    },
    quantidade: {
        flex: 1,
        
        marginLeft: 15,
        marginRight: 15,
    },

    bordar: {
        borderColor: "blue",
        borderWidth: 10,
    },
    detalheItem: {
        flex: 10,
        marginLeft: 15,
        marginRight: 15,
       
    },
    linha: {
        borderBottomColor: 'rgba(220,220,220, 0.3)',
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15
    },
    checkIcon: {
        position: 'absolute',
        right: metrics.padding,
        top: metrics.padding,
        color: colors.primary,
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
    },
    detalhesImovel: {
        flex: 1,
    },
    botao: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        padding: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 5,
    },
    textoBotao: {
        height: 31,
        backgroundColor: colors.primary,
        borderRadius: 30,
        paddingHorizontal: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    icon: {

    },
    description: {
        textAlign: 'center',
        color: colors.dark,
    },
    price: {
        textAlign: 'center',
        color: colors.light,
        marginTop: 5,
    }
})
