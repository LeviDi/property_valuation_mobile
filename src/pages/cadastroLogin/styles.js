import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    opacity: 0.9,
    
  },
  content: {
    alignItems: "center"
  },
  logo: {
    color: "white",
    fontSize: 40,
    fontStyle: "italic",
    textShadowColor: "#252525",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
    marginBottom: 20,
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.2)",
    borderRadius: 4,
  },
  input: {
    borderRadius: 4,
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)'
  },
  buttonContainer: {
    alignSelf: "stretch",
    margin: 20,
    padding: 20,
    backgroundColor: "blue",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.6)",
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  textLink: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    
    color: "white",
    borderRadius: 4,
    borderWidth: 1.5,
    padding: 10,
    
    borderColor: '#d6d7da',
  }
})

export default styles
