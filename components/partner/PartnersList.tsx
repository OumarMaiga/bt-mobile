import { Partner } from "@/types/partner";
import { FlatList, Text, View } from "react-native";
import PartnerItem from "./PartnerItem";

export default function PartnersList({partners, handelItemPress}: {partners: Partner[], handelItemPress: (partner: Partner) => void}) {
    return (
        <View style={{margin:20}}>
            <View style={{flex:1}}>
                <Text style={{fontSize:22, marginLeft: 10}}>Nos partenaires</Text>
                <FlatList
                    data={partners}
                    renderItem={({item}) => <PartnerItem partner={item} handelItemPress={handelItemPress} />}
                    keyExtractor={(item) => item.shareableId}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    />
            </View>
        </View>
    )
}