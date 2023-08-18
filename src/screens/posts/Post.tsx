import React from 'react';
import { Text, View } from 'react-native';

const Post: React.FC = ({ route, navigation }) => {
    const { id } = route.params;

    return (
        <View>
            <Text>Post with id: {id}</Text>
        </View>
    );
};

export default Post;
