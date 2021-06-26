import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, Platform, Alert, ActivityIndicator } from 'react-native'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';

import {
    InputWrapper,
    InputField,
    AddImage,
    SubmitBtn,
    SubmitBtnText,
    StatusWrapper,
} from '../styles/AddPost'


const AddPostScreen = () => {
    const {user, logout} = useContext(AuthContext);

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        })
    }

    const uploadImage = async () => {
        if(image == null){
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();

            setUploading(false);
            setImage(null);
            // Alert.alert('Uploaded Successfully');
            return url;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    const submitPost = async() => {
        const imageUrl = await uploadImage();
        console.log(imageUrl);

        firestore()
        .collection('posts')
        .add({
            userId: user.uid,
            post: post,
            postImg: imageUrl,
            postTime: firestore.Timestamp.fromDate(new Date()),
            likes: null,
            comments: null,
        })
        .then(() => {
            console.log('Post Added!');
            Alert.alert('posted🎃')
            setPost(null);
        })
        .catch((err) => {
            console.log('something went wrong on added post 🧐',err);
        })
    }


    return (
        <View style={styles.container}>
            <InputWrapper>

                <InputField
                    placeholder="What's going on?"
                    multiline
                    numberOfLine={4}
                    value={post}
                    onChangeText={(content) => setPost(content)}
                />
                {image != null ? <AddImage source={{ uri: image }} /> : null}
                {uploading ? (
                    <StatusWrapper>
                        <Text>{transferred} % completed</Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </StatusWrapper>
                ) : (
                    <SubmitBtn onPress={submitPost}>
                        <SubmitBtnText>Post</SubmitBtnText>
                    </SubmitBtn>
                )}
            </InputWrapper>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item
                    buttonColor='#9b59b6'
                    onPress={takePhotoFromCamera}>
                    <Icon name="camera" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor='#3498db'
                    onPress={choosePhotoFromLibrary}>
                    <Icon name="image" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    )
}

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: '#fff'
    }
})
