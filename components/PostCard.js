import React, { useContext, useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../navigation/AuthProvider';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

import { Card, UserInfo, UserImg, UserName, UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText, Divider } from '../styles/FeedStyles';
import ProgressiveImage from './ProgressiveImage';
import { TouchableOpacity, Share } from 'react-native';

const PostCard = ({ item, onDelete, onPress }) => {

    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    const likeIcon = item.liked ? 'heart' : 'heart-outline';
    const likeIconColor = item.liked ? '#FF3F7A' : '#333';

    if (item.likes == 1) {
        likeText = '1 like';
    } else if (item.likes > 1) {
        likeText = item.likes + ' likes';
    } else {
        likeText = 'like';
    }

    if (item.comments == 1) {
        commentText = '1 comment';
    } else if (item.comments > 1) {
        commentText = item.likes + ' comments';
    } else {
        commentText = 'comment';
    }

    const getUser = async () => {
        await firestore()
            .collection('users')
            .doc(item.userId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User Data', documentSnapshot.data());
                    setUserData(documentSnapshot.data());
                }
            })
    }

    useEffect(() => {
        getUser();
    }, []);


    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Card>
            <UserInfo>
                <UserImg source={{ uri: userData ? userData.userImg || 'https://raw.githubusercontent.com/Abhisek-Ray99/random-img/main/defaultuser.png' : 'https://raw.githubusercontent.com/Abhisek-Ray99/random-img/main/defaultuser.png' }} />
                <UserInfoText>
                    <TouchableOpacity onPress={onPress}>
                        <UserName>{userData ? userData.fname || 'Unknown' : 'Unknown'}{' '}{userData ? userData.lname || 'User' : 'User'}</UserName>
                    </TouchableOpacity>
                    <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.post}</PostText>
            {/* {item.postImg != null ? <PostImg source={{ u/ri: item.postImg }} /> : <Divider />} */}
            {item.postImg != null ? (
                <ProgressiveImage
                    defaultImageSource={require('../assets/defaultimg.png')}
                    source={{ uri: item.postImg }}
                    style={{ width: '100%', height: 200, borderRadius: 7, border: '0.2px solid #333' }}
                    resizeMode='cover'
                />
            ) : <Divider />}
            <InteractionWrapper>
                <Interaction>
                    <Icon name={likeIcon} size={25} color={likeIconColor} />
                    <InteractionText active={item.liked}>{likeText}</InteractionText>
                </Interaction>
                <Interaction>
                    <Icon name="md-chatbubble-outline" size={25} />
                    <InteractionText>{commentText}</InteractionText>
                </Interaction>
                <Interaction>
                    <Icon name="share-outline" size={25} onPress={onShare} />
                </Interaction>
                {user.uid == item.userId ? (
                    <Interaction onPress={() => onDelete(item.id)}>
                        <Icon name="trash-outline" size={25} />
                    </Interaction>
                ) : null}
            </InteractionWrapper>
        </Card>

    )
}

export default PostCard;
