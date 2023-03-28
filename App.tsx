import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import produce from 'immer';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type PlaceStackParamList } from './types/navigation';
import { type PlaceNativeStackScreenProps } from './types/navigation';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';
import { init } from './helper/database';

void preventAutoHideAsync()
    .then((result) =>
        console.log(
            `SplashScreen.preventAutoHideAsync() succeeded: ${String(result)}`
        )
    )
    .catch(console.warn);

const Stack = createNativeStackNavigator<PlaceStackParamList>();

const App = () => {
    // const navigation =
    //     useNavigation<PlaceNativeStackScreenProps<'AddPlace'>['navigation']>();

    const [appIsReady, setIsappIsReady] = useState<boolean>(false);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) await hideAsync();
    }, [appIsReady]);

    useEffect(function () {
        void init()
            .then(() => {
                setIsappIsReady((prevState) => {
                    const nextState = produce(prevState, (draft) => {
                        draft = true;
                        return draft;
                    });
                    return nextState;
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (!appIsReady) return null;

    return (
        <>
            <StatusBar style="dark" />
            <NavigationContainer onReady={onLayoutRootView}>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: Colors.primary500 },
                        headerTintColor: Colors.gray700,
                        contentStyle: { backgroundColor: Colors.gray700 },
                    }}
                >
                    <Stack.Screen
                        name="AllPlaces"
                        component={AllPlaces}
                        options={({
                            navigation,
                        }: PlaceNativeStackScreenProps<'AllPlaces'>) => ({
                            title: 'Your Favorite Places',
                            headerRight: ({ tintColor }) => (
                                <IconButton
                                    icon="add"
                                    size={24}
                                    color={tintColor ?? '#ffffff'}
                                    onPress={() =>
                                        navigation.navigate('AddPlace')
                                    }
                                />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="AddPlace"
                        component={AddPlace}
                        options={{ title: 'Add a new Place' }}
                    />
                    <Stack.Screen
                        name="Map"
                        component={Map}
                        options={{ title: 'Display Map' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;
