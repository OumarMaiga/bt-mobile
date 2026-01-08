import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  profile_header_container: {
    backgroundColor: '#09CC1C',
    paddingVertical: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  profile_header_title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
    marginTop: 10,
  },

  profile_header_subtitle: {
    color: '#E8FFE9',
    fontSize: 14,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 25,
    marginHorizontal: 20,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#E9FBEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  
  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    resizeMode: 'cover',
  },

  label: {
    fontSize: 12,
    color: '#8A8A8A',
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },

  actionsContainer: {
    marginTop: 30,
    marginBottom: 40,
  },

  primaryButton: {
    backgroundColor: '#09CC1C',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 40,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E53935',
  },

  logoutButtonText: {
    color: '#E53935',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
  },

})
