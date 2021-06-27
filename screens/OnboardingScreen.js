import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor,
                borderRadius: 35,
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
);


const OnboardingScreen = ({ navigation }) => {

    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.navigate('Login')}
            onDone={() => navigation.navigate('Login')}
            pages={[
                {
                    backgroundColor: '#92E5CE',
                    image: <Image source={require('../assets/o1.png')} />,
                    title: 'Share your Thoughts',
                    subtitle: 'Positive thinking will let you do everything better',
                },
                {
                    backgroundColor: '#FCEA82',
                    image: <Image source={require('../assets/o2.png')} />,
                    title: 'Share your Interests',
                    subtitle: 'If opportunity does not knock, build a door.',
                },
                {
                    backgroundColor: '#F1BABD',
                    image: <Image source={require('../assets/o3.png')} />,
                    title: 'Make Friends',
                    subtitle: 'True friends are always together in spirit.',
                }
            ]}
        />

    )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    done: {
        marginHorizontal: 10
    },
    text: {
        fontSize: 16
    }
})