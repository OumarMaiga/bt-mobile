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
    paddingLeft: 5,
    marginBottom: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    fontSize: 16,
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
