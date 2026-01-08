import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'

type Props = {
  message?: string
}

export default function InlineSuccess({ message }: Props) {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (message) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start()

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [message])

  if (!message) return null

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#E6FFEA',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  text: {
    color: '#2E7D32',
    fontSize: 14,
  },
})
