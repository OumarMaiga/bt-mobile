import styles from '@/assets/styles/login.styles'
import { useAuthStore } from '@/store/auth.store'
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native'

export default function HomeScreen() {

    const {logout} = useAuthStore()
    
    const handleLogout = () => {
        logout()
    }

    return (
        <View>
            <Text>Hello world</Text>
            
            <TouchableOpacity style={styles.button} onPress={()=>handleLogout()}>
                <Text style={styles.button_text}>Logout</Text>
            </TouchableOpacity>
        </View>
    )

}
