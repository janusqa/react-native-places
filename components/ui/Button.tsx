import { StyleSheet, Pressable, Text } from 'react-native';

import { Colors } from '../../constants/colors';

type Props = {
    children: React.ReactNode;
    onPress: () => void;
};

const Button = ({ children, onPress }: Props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed ? styles.pressed : null,
            ]}
            onPress={onPress}
        >
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        borderRadius: 4,
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary50,
    },
});
