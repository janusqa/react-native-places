import { StyleSheet, View, Alert, Image, Text } from 'react-native';
import {
    Accuracy,
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus,
    // type LocationObject,
} from 'expo-location';
import { useState, useEffect } from 'react';
import produce from 'immer';

import { useNavigation, useRoute } from '@react-navigation/native';
import { type PlaceNativeStackScreenProps } from '../../types/navigation';

import OutlinedButton from '../ui/OutlinedButton';
import { Colors } from '../../constants/colors';
import { getMapPreview } from '../../helper/location';
import { getAddress } from '../../helper/location';

type Props = {
    onPickLocation: (location: {
        lat: number;
        lng: number;
        address: string;
    }) => void;
};

const LocationPicker = ({ onPickLocation }: Props) => {
    const navigation =
        useNavigation<PlaceNativeStackScreenProps<'AddPlace'>['navigation']>();
    const route = useRoute<PlaceNativeStackScreenProps<'AddPlace'>['route']>();

    const [locationPermission, requestPermission] = useForegroundPermissions();
    const [location, setLocation] = useState<{ lat: number; lng: number }>();

    const verifyPermission = async () => {
        if (
            locationPermission &&
            locationPermission.status === PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (
            locationPermission &&
            locationPermission.status === PermissionStatus.DENIED
        ) {
            Alert.alert(
                'Insufficient permission!',
                'You need to grant location access to use this app'
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermission();
        if (hasPermission) {
            try {
                const location = await getCurrentPositionAsync({
                    accuracy: Accuracy.High,
                });
                setLocation((prevState) => {
                    const nextState = produce(prevState, (draft) => {
                        draft = {
                            lat: location.coords.latitude,
                            lng: location.coords.longitude,
                        };
                        return draft;
                    });
                    return nextState;
                });
                const address = await getAddress(
                    location.coords.latitude,
                    location.coords.longitude
                );
                onPickLocation({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                    address,
                });
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong';
                Alert.alert('Camera Error', message);
            }
        }
    };

    const pickOnMapHandler = async () => {
        const hasPermission = await verifyPermission();
        if (hasPermission) {
            if (location) {
                navigation.navigate('Map', {
                    location: {
                        lat: location?.lat,
                        lng: location?.lng,
                    },
                });
            }
        }
    };

    useEffect(
        function () {
            const handleLocation = async () => {
                if (route.params?.location.lat && route.params.location.lng) {
                    const lat = route.params.location.lat;
                    const lng = route.params.location.lng;
                    setLocation((prevState) => {
                        const nextState = produce(prevState, (draft) => {
                            if (draft) {
                                draft.lat = lat;
                                draft.lng = lng;
                            } else {
                                draft = {
                                    lat: lat,
                                    lng: lng,
                                };
                                return draft;
                            }
                        });
                        return nextState;
                    });

                    const address = await getAddress(lat, lng);
                    onPickLocation({ lat, lng, address });
                }
            };
            void handleLocation();
        },
        [route.params?.location.lat, route.params?.location.lng, onPickLocation]
    );

    const locationPreview = location ? (
        <Image
            style={styles.image}
            source={{
                uri: getMapPreview(location.lat, location.lng),
            }}
        />
    ) : (
        <Text>No location</Text>
    );

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    );
};

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});
