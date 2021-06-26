import React, { useContext, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

import FormButton from '../components/FormButton';
import Forminput from '../components/Forminput';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { login, googleLogin, fbLogin } = useContext(AuthContext);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../assets/user.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>Login to join</Text>
            <Forminput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            // keyboardType="email-address"
            />
            <Forminput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                autoCapitalize="none"
                secureTextEntry={true}
            />
            <FormButton
                buttonTitle="Sign In"
                onPress={() => login(email, password)}
            />
            <TouchableOpacity style={styles.forgotButton} onpress={() => { }}>
                <Text style={styles.navButton}>Forgot my Password ?</Text>
            </TouchableOpacity>

            {Platform.OS === 'android' ? (
                <View>
                    <SocialButton
                        buttonTitle="Sign in with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => googleLogin()}
                    />
                    <SocialButton
                        buttonTitle="Sign in with Facebook"
                        btnType="facebook"
                        color="#4867aa"
                        backgroundColor="#e6eaf4"
                        onPress={() => fbLogin()}
                    />
                </View>
            ) : null}


            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('Signup')}
            >
                <Text style={styles.navButton}>Don't have an account? create here</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    logo: {
        height: 160,
        width: 120,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 0,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    }
})