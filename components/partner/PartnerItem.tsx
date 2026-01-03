import { Partner } from "@/types/partner";
import { Image } from "expo-image";
import { Text, TouchableOpacity } from "react-native";

export default function PartnerItem({partner, handelItemPress}: {partner: Partner, handelItemPress: (partner: Partner) => void}) {
    return (
        <TouchableOpacity style={{margin:5}}
            onPress={() => handelItemPress(partner)}>
            <Image style={{width: 100, height: 100, backgroundColor: '#c4c4c4'}} 
                source={{uri: partner.imagePath}} />
            <Text style={{fontSize: 18, marginLeft: 4}}>{partner.companyName}</Text>
        </TouchableOpacity>
    )
}