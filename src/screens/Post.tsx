import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '@components/Router';
import styled from 'styled-components/native';
import { COLORS, FONT } from '@consts/theme';
import Comments from '@components/Comments';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { Loading } from '@components/Loader';
import {
    createComment,
    deleteComment,
    editComment,
    getPostById,
} from '@redux/slices/posts';

type RouterProps = NativeStackScreenProps<StackParamList, 'Post'>;

interface PostProps extends RouterProps {}

const Post: React.FC<PostProps> = ({ route, navigation }) => {
    const { postId } = route.params;
    const { isLoading, posts } = useAppSelector(state => state.posts);
    const dispatch = useAppDispatch();

    const { title, body, comments } = getPostById(posts, postId);

    const onAddComment = (text: string) => {
        dispatch(createComment(text, postId));
    };

    const onDeleteComment = (postId: string, commentId: string) => {
        dispatch(deleteComment(postId, commentId));
    };

    const onSaveComment = (postId: string, commentId: string, text: string) => {
        dispatch(editComment(postId, commentId, text));
    };

    if (!isLoading) {
        return <Loading />;
    }

    return (
        <View style={styles.box}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>

            <Comments
                onAddComment={onAddComment}
                onSaveComment={onSaveComment}
                onDeleteComment={onDeleteComment}
                items={comments}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 40,
        borderRadius: 10,
        backgroundColor: COLORS.white,
    },
    title: {
        fontSize: 24,
        fontFamily: FONT.SEMIBOLD,
        color: COLORS.primary,
        marginBottom: 15,
    },

    body: {
        fontSize: 16,
        color: COLORS.primary,
        marginBottom: 50,
    },
});

export default Post;
