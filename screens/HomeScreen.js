import React, { useEffect, useState } from 'react';
import { FlatList, Alert, ScrollView, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { Container } from '../styles/FeedStyles';
import PostCard from '../components/PostCard';

const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/u4.png'),
    postTime: '4 mins ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/p3.png'),
    liked: true,
    likes: '14',
    comments: '5',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/u9.png'),
    postTime: '2 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '8',
    comments: '0',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/u5.png'),
    postTime: '1 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/p1.jpg'),
    liked: true,
    likes: '1',
    comments: '0',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/u6.png'),
    postTime: '1 day ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/p2.png'),
    liked: true,
    likes: '22',
    comments: '4',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/u3.png'),
    postTime: '2 days ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0',
  },
];

const HomeScreen = ({navigation}) => {

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);
          querySnapshot.forEach(doc => {
            const { userId, post, postImg, postTime, likes, comments } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Profile Name',
              userImg: 'https://raw.githubusercontent.com/Abhisek-Ray99/random-img/main/img/u5.png',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments
            });
          })
        })

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', list);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete Post',
      'Are you Sure ?',
      [
        {
          text: 'cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel'
        },
        {
          text: 'confirm',
          onPress: () => deletePost(postId)
        }
      ],
      { cancelable: false }
    )
  }

  const deletePost = (postId) => {
    console.log("postid: ", postId);
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const { postImg } = documentSnapshot.data();
          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log('Error occur during deleting the image', e);
              })
          } else {
            deleteFirestoreData(postId);
          }
        }
      })

  }

  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert('Post deleted successfully🏆');
        setDeleted(true);
      })
      .catch(err => console.log('Getting error on deleting post', err))
  }

  const ListHeader = () => {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                  style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <View style={{ width: 300, height: 20, borderRadius: 4 }} />
              <View style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }} />
              <View style={{ marginTop: 6, width: 350, height: 200, borderRadius: 18 }} />
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', padding: 10 }}>
                <View style={{ marginTop: 6, width: 80, height: 30, borderRadius: 35 }} />
                <View
                  style={{ marginTop: 6, width: 80, height: 30, borderRadius: 35 }}
                />
                <View
                  style={{ marginTop: 6, width: 80, height: 30, borderRadius: 35 }}
                />
              </View>
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                  style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <View style={{ width: 300, height: 20, borderRadius: 4 }} />
              <View style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }} />
              <View style={{ marginTop: 6, width: 350, height: 200, borderRadius: 18 }} />
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', padding: 10 }}>
                <View style={{ marginTop: 6, width: 80, height: 30, borderRadius: 35 }} />
                <View
                  style={{ marginTop: 6, width: 80, height: 30, borderRadius: 35 }}
                />
                <View
                  style={{ marginTop: 6, width: 80, height: 30, borderRadius: 35 }}
                />
              </View>
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                  style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <View style={{ width: 300, height: 20, borderRadius: 4 }} />
              <View style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }} />
              <View style={{ marginTop: 6, width: 350, height: 200, borderRadius: 18 }} />
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', padding: 10 }}>
                <View style={{ marginTop: 6, width: 80, height: 30, borderRadius: 35 }} />
                <View
                  style={{ marginTop: 6, width: 80, height: 30, borderRadius: 35 }}
                />
                <View
                  style={{ marginTop: 6, width: 80, height: 30, borderRadius: 35 }}
                />
              </View>
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <Container>
          <FlatList
            data={posts}
            renderItem={({ item }) => <PostCard 
                                        item={item} 
                                        onDelete={handleDelete} 
                                        onPress={() => navigation.navigate('HomeProfile', {userId: item.userId})}
                                      />
            }
            keyExtractor={item => item.id}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />
        </Container>

      )}
    </View>
  )
}

export default HomeScreen
