import { StyleSheet, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';

type Props = {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    children: React.ReactNode;
    onPress: () => void;
};

const OutlinedButton = ({ icon, children, onPress }: Props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed ? styles.pressed : null,
            ]}
            onPress={onPress}
        >
            <Ionicons
                style={styles.icon}
                name={icon}
                size={18}
                color={Colors.primary500}
            />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary500,
    },
    pressed: {
        opacity: 0.7,
    },
    icon: {
        marginRight: 6,
    },
    text: {
        color: Colors.primary500,
    },
});
