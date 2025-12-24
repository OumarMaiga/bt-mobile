import { ActivityIndicator, StyleSheet, View } from 'react-native'

type Props = {
  visible: boolean
}

export default function Loading({ visible }: Props) {
  if (!visible) return null

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
