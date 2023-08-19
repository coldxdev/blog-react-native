import React from 'react';
import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '@components/Router';
import styled from 'styled-components/native';
import { COLORS, FONT } from '@consts/theme';
import Comments from '@components/Comments';

type RouterProps = NativeStackScreenProps<StackParamList, 'Post'>;

interface PostProps extends RouterProps {}

const { id, title, body, comments } = {
    id: 1,
    title: 'Tips on product illustration',
    body: 'Inspirational designs, illustrations, and graphic elements from the world’s best designers. Want more inspiration? Browse our search results.',
    comments: [1, 2, 3, 4],
};

const Post: React.FC<PostProps> = ({ route, navigation }) => {
    const { postId } = route.params;

    const PostBox = styled.View`
        padding: 15px 15px 40px;
        border-radius: 10px;
        background-color: ${COLORS.white};
    `;

    const PostTitle = styled.Text`
        font-size: 24px;
        font-family: ${FONT.SEMIBOLD};
        color: ${COLORS.primary};
        margin-bottom: 15px;
    `;

    const PostBody = styled.Text`
        font-size: 16px;
        color: ${COLORS.primary};
        margin-bottom: 50px;
    `;

    return (
        <PostBox>
            <PostTitle>{title}</PostTitle>
            <PostBody>{body}</PostBody>

            <Comments />
        </PostBox>
    );
};

export default Post;
