import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

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
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E9FBEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
})
