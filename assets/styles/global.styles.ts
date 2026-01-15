import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },  
  input: {
    // borderWidth: 1,
    // borderColor: '#E5E5E5',
    // borderRadius: 12,
    // paddingHorizontal: 14,
    // paddingVertical: 12,
    // fontSize: 15,
    // marginBottom: 14
    
		paddingLeft: 10,
		height: 48,
		borderWidth: 1,
		borderColor: '#D9D9D9',
		fontSize: 18,
		borderRadius: 5,
		marginBottom: 10,
		justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#22812B',
    paddingVertical: 12,
    borderRadius: 5,
  },
  button_text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#0000EE',
  },
})
