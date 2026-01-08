import { useAuthStore } from '@/store/auth.store';
import {
    Text,
    View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function PurchaseScreen() {

    const { user } = useAuthStore();
    
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <View style={{flex:1}}>
                <Text>Mes achats</Text>
            </View>
        </GestureHandlerRootView>
    )

}
