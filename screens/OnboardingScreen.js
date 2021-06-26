import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


const Done = ({...props}) => (
    <TouchableOpacity style={styles.done} {...props}>
        <Text style={styles.text}>Done</Text>
    </TouchableOpacity>
)

const OnboardingScreen = ({ navigation }) => {

    return (
        <Onboarding
            DoneButtonComponent={Done}
            onSkip={() => navigation.navigate('Login')}
            onDone={() => navigation.navigate('Login')}
            pages={[
                {
                    backgroundColor: '#92E5CE',
                    image: <Image source={require('../assets/onboarding-img1.png')} />,
                    title: 'Share your Thoughts',
                    subtitle: 'Positive thinking will let you do everything better',
                },
                {
                    backgroundColor: '#FCEA82',
                    image: <Image source={require('../assets/onboarding-img2.png')} />,
                    title: 'Share your Interests',
                    subtitle: 'If opportunity does not knock, build a door.', 
                },
                {
                    backgroundColor: '#F1BABD',
                    image: <Image source={require('../assets/onboarding-img3.png')} />,
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