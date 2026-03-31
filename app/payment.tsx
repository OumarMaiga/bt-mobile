import { getBoughtTicketFromPaymentUid } from '@/services/booking.service';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

export default function PaymentScreen() {

    const { 
        url, 
        axisId, 
        endPointCityId,
        departureDate,
    } = useLocalSearchParams<{
        url: string;
        departureDate: string;
        axisId: string;
        endPointCityId: string;
    }>();
    
    // éviter double exécution
    const alreadyHandled = useRef(false);

    const handleNavigationChange = async (navState: WebViewNavigation) => {
        const currentUrl = navState.url;

        if (!currentUrl.includes("return") || alreadyHandled.current) return;

        alreadyHandled.current = true;

        try {
            const parsedUrl = new URL(currentUrl);

            const status = parsedUrl.searchParams.get("status");
            const paymentUid = parsedUrl.searchParams.get("payment-uid");

            const cancelled = status === "cancelled";

            if (cancelled) {
                router.replace({
                    pathname: '/ticket',
                    params: {
                        status: 'cancel',
                        axisId: axisId, 
                        endPointCityId: endPointCityId, 
                        departureDate: departureDate
                    },
                });
                return;
            }

            if (!paymentUid) {
                throw new Error("paymentUid manquant");
            }

            const boughtTicket = await getBoughtTicketFromPaymentUid(paymentUid);

            if (boughtTicket.paymentStatus === 0) {
                router.replace({
                    pathname: "/ticket",
                    params: {
                        status: 'initiated',
                        axisId: axisId,
                        endPointCityId: endPointCityId,
                        departureDate: departureDate
                    }
                });

            } else if (boughtTicket.paymentStatus === 1) {
                router.replace({
                pathname: '/bookingDetail',
                params: {
                    id: boughtTicket.id,
                },
                });

            } else if (boughtTicket.paymentStatus === 2) {
                router.replace({
                    pathname: "/ticket",
                    params: {
                        status: 'failed',
                        axisId: axisId,
                        endPointCityId: endPointCityId,
                        departureDate: departureDate
                    }
                });
            }

        } catch (error) {
            console.log("Erreur payment:", error);

            router.replace({
                pathname: "/ticket",
                params: {
                    status: 'failed',
                    axisId: axisId,
                    endPointCityId: endPointCityId,
                    departureDate: departureDate
                }
            });
        }
    };

    return (
        <View style={{ flex: 1 }}>
        <WebView
            source={{ uri: url }}
            onNavigationStateChange={handleNavigationChange}
            style={{ flex: 1 }}
        />
        </View>
    );
}