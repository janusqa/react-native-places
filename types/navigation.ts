// import type {
//     CompositeScreenProps,
//     NavigatorScreenParams,
// } from '@react-navigation/native';
// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type PlaceStackParamList = {
    AllPlaces: undefined;
    AddPlace: { location: { lat: number; lng: number } } | undefined;
    Map: { location: { lat: number; lng: number } } | undefined;
    PlaceDetails: { placeId: number };
};

export type PlaceNativeStackScreenProps<T extends keyof PlaceStackParamList> =
    NativeStackScreenProps<PlaceStackParamList, T>;

// declare global {
//     namespace ReactNavigation {
//         interface RootParamList extends AuthNativeStackParamList {}
//     }
// }
